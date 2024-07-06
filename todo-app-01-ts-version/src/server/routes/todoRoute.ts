import connection from '../connectDB';
import { ResultSetHeader, RowDataPacket } from "mysql2"
import express from 'express';
const router = express.Router();

interface Todo extends  RowDataPacket{
    todo_id: number,
    task: string,
}
router.get('/getAllTodo', (req, res) => {
    const  userId   = req.headers["userId"];
    console.log('get all todos')
    const sql =  'SELECT todo_id, task FROM todos WHERE userId = ?'
    connection.query<Todo[]>(sql, [userId], (err, results) => {
        if (err){
            console.error("Query failed in getTodo method : ", err.message)
        }
        else {
            console.log('get all todos: ', results);
            return res.status(200).json(results)
        }
    })
})


router.post('/createNewTodo',(req, res) => {
    const { task } = req.body;

    console.log(task);
    const loggedUserId = req.headers["userId"];
    if(!task || !loggedUserId){
        return res.status(401).send({ message: "Please fulfill the input box" })
    }
    const values = [task, loggedUserId]
    const sql = 'INSERT INTO todos (task, userId) VALUES(?, ?)'
    connection.query<ResultSetHeader>(sql, values, (err, results) => {
        if(err){
            console.error("Query failed in createTodo method : ", err.message)
        }
        else {
            console.log('here')
            return res.status(201).send({ message: "todo created successfully" , todo_id: results.insertId})
        }
    })
})

router.patch('/updateTodoTitle', (req, res) => {
    const { todoId, title } = req.body
    console.log(todoId, title )


    const sql = 'UPDATE todos SET task = ? WHERE todo_id = ?'
    connection.query<ResultSetHeader>(sql, [title, todoId], async (err, results) => {
        if (err){
            return res.status(500).json({
                message: "Query failed for update item"
            })
        }
        else {
            console.log("affected rows is/are ", results.affectedRows);
            return res.status(200).json({message: "todo updated successfully"})
        }
    })
})


router.post('/deleteTodo', (req, res) => {
    const todoId = [req.body.todoId];
    const sql = 'DELETE FROM todos WHERE todo_id = ?'
    connection.query<ResultSetHeader>(sql, todoId, (err, results) => {
        if (err){
            console.error("Query failed in deleteTodo method : ", err.message)
            return res.status(404).json({
                msg: err.message
            })
        }
        else {
            console.log("affected rows are: ", results.affectedRows);
            return res.status(202).json({ message: "task deleted successfully"})
        }
    })
})

export default router;
import sql from '../connectDB';
import { ResultSetHeader, RowDataPacket } from "mysql2"
import express, {Request, Response} from 'express';
const router = express.Router();

interface Todo extends  RowDataPacket{
    todo_id: number,
    task: string,
}

router.get('/getAllTodo', (req: Request, res: Response) => {
    const  userId   = req.headers["userId"];

    const query =  'SELECT todo_id, task FROM todos WHERE userId = ?'
    sql.query<Todo[]>(query, [userId], (err, results) => {
        if (err){
            console.error("Query failed in getTodo method : ", err.message)
        }
        else {
            console.log('get all todos: ', results);
            return res.status(200).json(results)
        }
    })
});


router.post('/createNewTodo',(req: Request, res: Response) => {
    const { task } = req.body;

    const loggedUserId = req.headers["userId"];
    if(!task || !loggedUserId){
        return res.status(401).send({ message: "Please fulfill the input box" })
    }
    const values = [task, loggedUserId]
    const query = 'INSERT INTO todos (task, userId) VALUES(?, ?)'
    sql.query<ResultSetHeader>(query, values, (err, results) => {
        if(err){
            console.error("Query failed in createTodo method : ", err.message)
        }
        else {
            return res.status(201).send({ message: "todo created successfully" , todo_id: results.insertId})
        }
    })
});

router.patch('/updateTodoTitle', (req: Request, res: Response) => {
    const { todoId, title } = req.body

    const query = 'UPDATE todos SET task = ? WHERE todo_id = ?'
    sql.query<ResultSetHeader>(query, [title, todoId], async (err, results) => {
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
});


router.post('/deleteTodo', (req, res) => {
    const todoId = [req.body.todoId];
    const query = 'DELETE FROM todos WHERE todo_id = ?'
    sql.query<ResultSetHeader>(query, todoId, (err, results) => {
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
});

export default router;
const connection = require('../connectDB')

module.exports = {
    getTodo: (req, res) => {
        const  userId   = req.userId;
        const sql =  'SELECT todo_id, task FROM todos WHERE userId = ?'
        connection.query(sql, [userId], (err, results) => {
            if (err){
                console.error("Query failed in getTodo method : ", err.message)
            }
            else {
                return res.status(200).json(results)
            }
        })
    },
    createTodo: (req, res) => {
        const { task } = req.body;
        const loggedUserId = req.userId 
        
        if(!task || !loggedUserId){
            return res.status(401).send({ message: "Please fulfill the input box" })
        }
        const values = [task, loggedUserId]
        const sql = 'INSERT INTO todos (task, userId) VALUES(?, ?)'
        connection.query(sql, values, (err, results) => {
            if(err){
                console.error("Query failed in createTodo method : ", err.message)
            }
            else {
                return res.status(201).send({ message: "todo created successfully" , todo_id: results.insertId})
            }
        })

    },

    updateTodo: (req, res) => {
        const { todoId, title } = req.body
        const sql = 'UPDATE todos SET task = ? WHERE todo_id = ?'
        connection.query(sql, [title, todoId], async (err, results) => {
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
    },

    deleteTodo: (req, res) => {
        const todoId = [req.body.todoId];
        const sql = 'DELETE FROM todos WHERE todo_id = ?'
        connection.query(sql, todoId, (err, results) => {
            if (err){
                console.error("Query failed in deleteTodo method : ", err.message)
            }
            else {
                return res.status(204).send({ message: "task deleted successfully"})
            }
        })

    }
}
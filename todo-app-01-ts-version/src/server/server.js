require('dotenv').config();
const express = require('express')
const app = express()
let jwt = require('jsonwebtoken')
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const connection = require('./connectDB')
const TodoController = require('./controllers/todosController')
const middleware = require('./middleware')
const auth = middleware.auth
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send({message: "hello from home page"})
})


app.post('/signup', (req, res) =>{
    
    const {email, password } = req.body;
    const values = [email]
    
    const sql1 = 'SELECT * FROM users WHERE  user_email = ?';
    connection.query(sql1, values, (err, results) => {
        if (err) {
            console.log(err)
        }
        if (results.length === 0){
            // if array is empty it means that user does not exist

            //  so create a new user into database
            const newUser = [password, email]
            const query2 = `INSERT INTO users (user_password, user_email) VALUES (?, ?);`;
            connection.query(query2, newUser, (err, results) => {
                if (err){
                    console.log(err)
                }
                else {
                    console.log('Inserted successfully rows affected: ', results.affectedRows)
                    return res.status(201).send({message: "User created successful"})
                }
            })
        }
        else {
            // means that user already exist
            return res.status(403).send({message: "Email already exist"})
        }
         
    });
   
})


app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const value = [email]

    const query1 = 'SELECT * FROM users WHERE user_email = ?'
    connection.query(query1, value, (err, results) => {
        if (err){
            console.error("query err: ", err.message);
        }
        else {

            if (results.length === 0){
                //it means that user with the email not found
                return res.status(403).send({message: "Email not found" })
            }
            if (results[0].user_password !== password){
                return res.status(403).send({message: "Incorrect! password" })
            }
            else {

                const token = jwt.sign({
                    userId: results[0].user_id
                }, process.env.JWT_SECRET)
                res.status(200).json({token: token})
            }
        }
    })  
})
app.post('/logout', auth, async (req, res) => {
    try {
        const token = [req.headers["authorization"]];
        const sql = 'SELECT * FROM oldToken WHERE invalidatedToken = ? ';
        connection.query(sql, token, (err, results) => {
            if (err){
                console.log("Error! : ", err.message);
            }
            else {
                console.log(results)
                if (results.length === 0){
                    //means that the token which i am going to clear from my browser is not in the list of invalid token
                    // so first i have to insert this token into datbase for future validation 
                    const sql1 = 'INSERT INTO oldToken(invalidatedToken) VALUES(?)'
                    connection.query(sql1, token, (err, results) => {
                        if (err){
                            console.log(err.message)
                        }
                        else{
                            return res.status(200).send({message: "Successful logout"});
                        }
                    } )
                }
                else {
                    return res.status(401).send({ message: 'Token already invalidated' });
                }
            }
        })
 
    }catch(error){
        console.log(error);
        res.status(500).send({message : 'user not logout'})
    }

})
app.get('/getAllTodo', auth, TodoController.getTodo);
app.post('/createNewTodo', auth, TodoController.createTodo)
app.post('/updateTodo', auth, TodoController.updateTodo)
app.post('/deleteTodo', auth, TodoController.deleteTodo)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const cors = require('cors')
const connection = require('./connectDB')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send("hello world")
})

app.post('/signup', (req, res) => {
    const { email, password, confirmPassword } = req.body;
    console.log(email, password)


    if (password !== confirmPassword) {
        return res.json({ message: "Incorrect! password" })

    }

    const sql = 'SELECT * FROM users WHERE user_email = ?'
    connection.query(sql, [email], async (err, results) => {
        if (err) {
            console.log("Failed query: ", err.message);
        }
        else {
            if (results.length != 0) {
                // It means that the email alredy exist
                return res.json({ message: "Email already exist" })
            }
            else {
                // Insert the new user into database

                try {

                    const hashPassword = await bcrypt.hash(password, 10)
                    const newUser = [email, hashPassword]
                    const sql2 = 'INSERT INTO users(user_email, user_password) VALUES(?, ?)'
                    connection.query(sql2, newUser, (err, results) => {
                        if (err) {
                            console.log("query failed: ", err.message);
                        }
                        else {
                            return res.status(201).json({ message: "User created successfully", hashPassword: hashPassword })
                        }
                    })
                } catch (error) {
                    return res.status(400).send({ message: error.message });
                }

            }
        }
    })
})


app.post('/login', async (req, res) => {

    const { email, password } = req.body
    try {

        const sql = 'SELECT * FROM users WHERE user_email = ?'
        connection.query(sql, [email], async (err, results) => {
            if (err) {
                console.log("Failed query: ", err.message);
            }
            else {
                // It can be possible that user enter a wrong password so wen need  to chekc here
                if (results.length === 0) {
                    // means that user with the email does not exist
                    return res.send({ message: "Email not found" })
                }

                const userPassword = results[0].user_password

                if (await bcrypt.compare(password, userPassword)) {
                    // lets create a token so that we can identify the user in future request
                    const userId = { userId: results[0].user_id }
                    const token = jwt.sign(userId, process.env.JWT_SECRET)

                    return res.status(201).send({ jwtToken: token })

                }
                else {
                    return res.status(400).send({ message: "Incorrect!! password" })

                }
            }
        })

    }
    catch (error) {
        return res.status(400).send({ message: error.message })
    }


})

app.post('/logout', auth, (req, res) => {
    const token = req.headers["authorization"]
    // put the token in invalidate token so that in future any one access it will not be able to access the private content
    const sql = "INSERT INTO expireTokens(invalidToken) VALUE(?)"
    connection.query(sql, [token], (err, results) => {
        if (err) {
            console.log("Failed query : ", err.message)
        }
        else {
            return res.status(200).send({ message: "LogOut successfully" })

        }
    })

})

function auth(req, res, next) {
    const authheader = req.headers["authorization"]

    if (!authheader) {
        return res.status(500).send({ message: "Missing auth header" })
    }
    // now decode the authorization header
    const decoded = jwt.verify(authheader, process.env.JWT_SECRET)

    if (decoded && decoded.userId) {
        req.userId = decoded.userId;
        next();
    }
    else {
        return res.status(500).send({ message: "Incorrect!! token" })
    }
}



app.get('/notes', auth, (req, res) => {
    const userId = req.userId
    const currentToken = req.headers["authorization"]
    // check the whether currentToken lies in table of invalidate token or not 
    const sql = 'SELECT *FROM expireTokens  WHERE invalidToken = ? '
    connection.query(sql, [currentToken], (err, results) => {
        if (err) {
            console.log('Query Failed: ', err.message)
            return res.status(500)
        }
        else {
            // if results length === 0 it means all is ok
            if (results.length === 0) {
                // write a new query to fetch all the notes form notes table 
                const sql1 = 'SELECT note_id, note_content FROM notes WHERE userId = ?'
                connection.query(sql1, [userId], (err, results) => {
                    if (err) {
                        console.log('Query Failed: ', err.message)
                        return res.status(500)
                    }
                    else {
                        return res.status(200).send(results)
                    }
                })
            }
            else {
                // means that some one has access to old token and he is making request for accessign content of a user
                return res.status(401);

            }
        }
    })
})


// below route is setup for creating new notes in database

app.post('/createNotes', auth, (req, res) => {

    const noteTitle = req.body.title
    const userId = req.userId
    const sql = 'INSERT INTO notes(note_title, userId) VALUES(?, ?)'
    connection.query(sql, [noteTitle, userId], (err, results) => {
        if (err) {  
            console.log("Query failed: ", err.message)
            return res.status(500).send({ message: "Query failed" })
        }
        else {
            return res.status(200).send({ message: "notes created successfully" })
        }
    })
})


app.post('/deleteNote', auth, (req, res) => {

    const noteId = req.body.noteId
    // const title = req.body.title
    const sql = 'DELETE FROM notes WHERE note_id = ?'
    connection.query(sql, [noteId], (err, results) => {
        if (err) {
            console.log("Query failed: ", err.message)
            return res.status(500).send({ message: "Query failed" })
        }
        else {
            return res.status(201).send({ message: "notes deleted successfully" })
        }

    })
})


app.get('/getAllOpenTab', (req, res) => {

    const sql = 'SELECT note_id, note_title, currentTab FROM notes WHERE isOpenTab = 1';
    connection.query(sql, (error, results) => {
        if(error){
            console.log(error.message);
            return res.status(500).json({message: "Query failed"})
        }
        else {
            return res.status(200).send(results);
        }
    })
})

app.post('/postNewOpenTab', (req, res) => {

    const noteId = req.body.note_id;
    // now set the isTabOpen column as true in notes table so that we can identify that which tab is opened
    const sql = 'UPDATE notes SET isOpenTab = ?  WHERE note_id = ?'
    connection.query(sql, [true, noteId], (error, results) => {
        if (error){
            console.log(error.message);
            return res.status(500).json({message: "Query failed"})
        }
        else {
            return res.status(200).send({message: "Tab opened successfully"})
        }
    })    
})

app.post('/closeOpenTab', (req, res) => {
    const noteId = req.body.note_id;
    const sql = 'UPDATE notes SET isOpenTab = ? WHERE note_id = ?'
    connection.query(sql, [false, noteId], (error, results) => {
        if (error){
            console.log(error.message);
            return res.status(500).json({message: "Query failed"})
        }
        else {
            return res.status(200).send({message: "tab closed successfully"})

        }
    })
})

app.post('/setCurrentTab', (req, res) => {
    const noteId = req. body.note_id
    // make the value of currentTab as true for the given noteId and make rest fo the currentTab column as false
    const sql1 = 'UPDATE notes SET currentTab = ?'
    connection.query(sql1, [false], (error) => {
        if (error){
            console.log(error.message);
            return res.status(500).json({message: "Query failed"})
        }
        else {
            // if query does not fail it means that all value in currentTab column has been set to flase or 0
            // now make a new query to set the value of currentTab which have note_id = noteId as true or 1
            const sql2 = 'UPDATE notes SET currentTab = ? WHERE note_id = ?'
            connection.query(sql2, [true, noteId], (error) => {
                if (error){
                    console.log(error.message);
                    return res.status(500).json({message: "Query failed"})
                }
                else {
                    return res.status(200).send({message: "Current tab has been set successfully"})
                }       
            })
        }
    })
})

app.post('/saveContent', (req, res) => {
    const {noteContent, noteId} = req.body;
    //note_content  
    const sql = 'UPDATE notes SET note_content = ?  WHERE note_id = ?'
    connection.query(sql, [noteContent, noteId] , (error, results) => {
        if (error){
            console.log(error.message);
            return res.status(500).json({message: "Query failed"})
        }
        else {
            return res.status(200).send({message: "Content saved successfully"})
        }
    })
})

app.get('/getContent', async (req, res) => {
    // return the note_content of currentTab(or where currentTab == true)
    try {
        const sql = 'SELECT note_content FROM notes WHERE currentTab = ?'
        connection.query(sql, [true], (error, results) => {
            if (error) {
                console.log(error.message)
                return res.status(500).json({ message: "Query failed" })
            }
            else {
                return res.status(200).send(results[0])
            }
        })
    }
    catch(error){
        console.log(error);
    }   
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

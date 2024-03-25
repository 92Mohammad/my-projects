import express from 'express'
const app = express()
import cors from 'cors'
import jwt  from 'jsonwebtoken'

const bcrypt = require('bcrypt')

app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send("hello world")
})








// below route is setup for creating new notes in database


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


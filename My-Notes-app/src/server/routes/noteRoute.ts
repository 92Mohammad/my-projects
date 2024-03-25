import express from 'express'
const router = express.Router();
import auth from '../middleware/jwtAuthenticate'
import Note from '../models/note.model'

interface NoteType {
    note_id: string,
    note_content: string
}
router.get('/notes', auth, async(req, res) => {
    try {
        const userId = req.headers["userId"]
        const notes = await Note.find({ userId: userId}) as NoteType[];
        if (notes.length !== 0){
            return res.status(200).json({notes: notes})
        }
        return res.status(402).json({ message: 'You have no Notes'})

    }
    catch (error: any) {
        return res.status(500).json({ error: error.message})
    }




    // const currentToken = req.headers["authorization"]
    // // check the whether currentToken lies in table of invalidate token or not
    // const sql = 'SELECT *FROM expireTokens  WHERE invalidToken = ? '
    // connection.query(sql, [currentToken], (err, results) => {
    //     if (err) {
    //         console.log('Query Failed: ', err.message)
    //         return res.status(500)
    //     }
    //     else {
    //         // if results length === 0 it means all is ok
    //         if (results.length === 0) {
    //             // write a new query to fetch all the notes form notes table
    //             const sql1 = 'SELECT note_id, note_content FROM notes WHERE userId = ?'
    //             connection.query(sql1, [userId], (err, results) => {
    //                 if (err) {
    //                     console.log('Query Failed: ', err.message)
    //                     return res.status(500)
    //                 }
    //                 else {
    //                     return res.status(200).send(results)
    //                 }
    //             })
    //         }
    //         else {
    //             // means that some one has access to old token and he is making request for accessign content of a user
    //             return res.status(401);
    //
    //         }
    //     }
    // })
})


router.post('/createNotes', auth, async(req, res) => {
    try{
        const noteTitle = req.body.title;
        const userId = req.headers["userId"];
        const newNote = await Note.create({note_title: noteTitle, userId: userId})
        if (newNote){
            return res.status(201).json({message: 'Notes created successfully'})
        }
        return res.status(402).json({ message: 'Not able to create'})

    }
    catch(error: any){
        return res.status(500).json({ error: error.message})
    }
    //
    //
    // const sql = 'INSERT INTO notes(note_title, userId) VALUES(?, ?)'
    // connection.query(sql, [noteTitle, userId], (err, results) => {
    //     if (err) {
    //         console.log("Query failed: ", err.message)
    //         return res.status(500).send({ message: "Query failed" })
    //     }
    //     else {
    //         return res.status(200).send({ message: "notes created successfully" })
    //     }
    // })
})

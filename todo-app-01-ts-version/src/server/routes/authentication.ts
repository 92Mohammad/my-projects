import express from 'express'
import jwt from 'jsonwebtoken'
import { ResultSetHeader, RowDataPacket } from "mysql2"
import auth from '../middleware'
import  connection  from "../connectDB";
const router = express.Router();

export interface User extends RowDataPacket{
    user_id?: number,
    email: string,
    password: string,

}
router.post('/signup', (req, res) =>{

    const {email, password } = req.body;
    const values = [email]

    const sql1 = 'SELECT * FROM users WHERE  user_email = ?';
    connection.query<User[]>(sql1, values, (err, results) => {
        if (err) {
            console.log(err)
        }
         console.log(results);
        if (results.length === 0){
            const newUser = [password, email]
            const query2 = `INSERT INTO users (user_password, user_email) VALUES (?, ?)`;
            connection.query<ResultSetHeader>(query2, newUser, (err, results) => {
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



router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const value = [email]

    const query1 = 'SELECT * FROM users WHERE user_email = ?'
    connection.query<User[]>(query1, value, (err, results) => {
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
                }, process.env.JWT_SECRET!)
                res.status(200).json({token: token})
            }
        }
    })
})



router.post('/logout', auth, async (req, res) => {

    return res.status(200).json({
        message: ' user successfully logout'
    })

        // const token = [req.headers["authorization"]];
        // const sql = 'SELECT * FROM oldToken WHERE invalidatedToken = ? ';
        // connection.query(sql, token, (err, results) => {
        //     if (err){
        //         console.log("Error! : ", err.message);
        //     }
        //     else {
        //         console.log(results)
        //         if (results.length === 0){
        //             //means that the token which i am going to clear from my browser is not in the list of invalid token
        //             // so first i have to insert this token into datbase for future validation
        //             const sql1 = 'INSERT INTO oldToken(invalidatedToken) VALUES(?)'
        //             connection.query(sql1, token, (err, results) => {
        //                 if (err){
        //                     console.log(err.message)
        //                 }
        //                 else{
        //                     return res.status(200).send({message: "Successful logout"});
        //                 }
        //             } )
        //         }
        //         else {
        //             return res.status(401).send({ message: 'Token already invalidated' });
        //         }
        //     }
        // })

    // }catch(error){
    //     console.log(error);
    //     res.status(500).send({message : 'user not logout'})
    // }

})

export default router;
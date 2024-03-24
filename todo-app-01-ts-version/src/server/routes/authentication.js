"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var connectDB_1 = require("../connectDB");
var router = express_1.default.Router();
router.post('/signup', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    var values = [email];
    var sql1 = 'SELECT * FROM users WHERE  user_email = ?';
    connectDB_1.default.query(sql1, values, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
        // if (results.length === 0){
        //     // if array is empty it means that user does not exist
        //     //  so create a new user into database
        //     const newUser = [password, email]
        //     const query2 = `INSERT INTO users (user_password, user_email) VALUES (?, ?)`;
        //     connection.query(query2, newUser, (err, results) => {
        //         if (err){
        //             console.log(err)
        //         }
        //         else {
        //             console.log('Inserted successfully rows affected: ', results.affectedRows)
        //             return res.status(201).send({message: "User created successful"})
        //         }
        //     })
        // }
        // else {
        //     // means that user already exist
        //     return res.status(403).send({message: "Email already exist"})
        // }
    });
});
// router.post('/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     const value = [email]
//
//     const query1 = 'SELECT * FROM users WHERE user_email = ?'
//     connection.query(query1, value, (err, results) => {
//         if (err){
//             console.error("query err: ", err.message);
//         }
//         else {
//
//             if (results.length === 0){
//                 //it means that user with the email not found
//                 return res.status(403).send({message: "Email not found" })
//             }
//             if (results[0].user_password !== password){
//                 return res.status(403).send({message: "Incorrect! password" })
//             }
//             else {
//
//                 const token = jwt.sign({
//                     userId: results[0].user_id
//                 }, process.env.JWT_SECRET)
//                 res.status(200).json({token: token})
//             }
//         }
//     })
// // })
//
//
//
// router.post('/logout', authJwt, async (req, res) => {
//     try {
//         const token = [req.headers["authorization"]];
//         const sql = 'SELECT * FROM oldToken WHERE invalidatedToken = ? ';
//         connection.query(sql, token, (err, results) => {
//             if (err){
//                 console.log("Error! : ", err.message);
//             }
//             else {
//                 console.log(results)
//                 if (results.length === 0){
//                     //means that the token which i am going to clear from my browser is not in the list of invalid token
//                     // so first i have to insert this token into datbase for future validation
//                     const sql1 = 'INSERT INTO oldToken(invalidatedToken) VALUES(?)'
//                     connection.query(sql1, token, (err, results) => {
//                         if (err){
//                             console.log(err.message)
//                         }
//                         else{
//                             return res.status(200).send({message: "Successful logout"});
//                         }
//                     } )
//                 }
//                 else {
//                     return res.status(401).send({ message: 'Token already invalidated' });
//                 }
//             }
//         })
//
//     }catch(error){
//         console.log(error);
//         res.status(500).send({message : 'user not logout'})
//     }
//
// })
exports.default = router;

import express from 'express'
import jwt from "jsonwebtoken";
const router = express.Router();
import bcrypt from 'bcrypt'
import User from '../models/user.model'



router.post('/signup', async(req, res) => {
    const { username, email, password } = req.body;
    console.log(email, password)
    try {
        const user = await User.findOne({username});
        if (!user){
            //add new user to database
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await User.create({
                username: username,
                email: email,
                password: hashedPassword
            })
            return res.status(201).json({ message: 'User created successfully'})
        }
        if (user){
            return res.status(409).json({message: 'User name already exist'} );
        }

    }
    catch(error: any) {
        return res.status(500).json({error: error.message})
    }
})


router.post('/login', async (req, res) => {

    const { username, password } = req.body
    try {
        const user = await User.findOne({ username: username});
        if (!user){
            return res.status(402).json( { message: "User Not found"});
        }
        else {
            const ans = await bcrypt.compare(password, user.password)
        }


    }
    catch(error: any){
        return res.status(500).json({ error: error.message})
    }


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



})

export default router;
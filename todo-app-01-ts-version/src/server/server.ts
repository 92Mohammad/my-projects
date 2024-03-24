import express from 'express';
import cors from 'cors';
import todoRoute from './routes/todoRoute'

import auth from './middleware'
import authRoute from "./routes/authentication";
require('dotenv').config();
const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send({message: "hello from home page"})
})

app.use('/auth', authRoute)
app.use('/todo',auth,  todoRoute)


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
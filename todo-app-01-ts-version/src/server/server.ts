import express , { Response} from 'express';
import cors from 'cors';
import todoRoute from './routes/todoRoute'
import auth from './middleware'
import authRoute from "./routes/authentication";
require('dotenv').config();
import sql from './connectDB'
const app = express()
const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())


app.get('/', (_, res: Response) => {
    res.send({message: "hello from home page"})
})

app.use('/auth', authRoute)
app.use('/todo',auth,  todoRoute)


// Establish connection  to database
sql.connect((err) => {
    if(err){
        console.error('Error in connecting to the database ❌: ', err.message)
        return;
    }    
    console.log('Connected to the database✅')
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
});


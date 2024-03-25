import mongoose from "mongoose";
import express from 'express'
const app = express();

mongoose.connect(process.env.DB_STRING!)
    .then(() =>{
        console.log("Connected to database");
        app.listen(process.env.PORT, () => console.log('server is listening on port ' + process.env.PORT) );
    })
    .catch((err) => console.log("Error occurred!" , err));

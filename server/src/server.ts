import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import env from "./util/validateEnv";
const app = express();

const port=env.PORT;
app.get("/",(req,res)=>{
    res.send("Hello World");
} );

mongoose.connect(env.MONGO_CONNECTION_STRING)
.then(()=>{
    console.log(`Mongoose connected`);
    app.listen(port,()=>{
        console.log(`Server running on ${port}`);
    });
})
.catch(console.error);


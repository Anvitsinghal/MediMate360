import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connDB from "./config/db.js";

const app=express();
dotenv.config();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello");
})
const port=process.env.PORT||5000;
app.listen(port,()=>{
    connDB();
    console.log(`listening on ${port}`);
})
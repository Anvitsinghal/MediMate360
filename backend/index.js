import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import schemeRoutes from "./routes/schemeRoutes.js"
import "./utils/reminderCron.js"
import reminderRoutes from "./routes/reminderRoutes.js"
import medicineRoutes from "./routes/medicineRoutes.js"
import relevanceRoutes from "./routes/relevanceRoutes.js"
import prescriptionRoutes from "./routes/prescriptionRoutes.js"
const app=express();
dotenv.config();
app.use(cors({
    origin:'https://medimate360-frontend.onrender.com',
    credentials:true
}))
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello");
})
app.use('/user',authRoutes);
app.use('/scheme',schemeRoutes);
app.use('/reminder',reminderRoutes);
app.use('/medicine',medicineRoutes);
app.use('/relevant',relevanceRoutes);
app.use('/prescription',prescriptionRoutes);
const port=process.env.PORT||5000;
app.listen(port,()=>{
    connDB();
    console.log(`listening on ${port}`);
})
import mongoose from "mongoose";

const connDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("DB connected");
    } catch (error) {
        console.log(error);
        
    }
}
export default connDB
import mongoose from "mongoose";

const prescriptions=new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  sourceType: {
    type: String,
    enum: ['image', 'manual'],
    default: 'manual'
  },
  imageurl:{
    type:String
  },
  extractedMedicines: [
    {
      name: { type: String },
      dosage: { type: String },         
      relevanceScore: { type: Number }, 
      matchReason: { type: String }    
    }
  ],
  diseaseInput: {
    type: String 
  },
  translationLanguage: {
    type: String, 
    default: 'en'
  }
},{
    timestamps:true
})
export const Prescription=mongoose.model("Prescription",prescriptions);
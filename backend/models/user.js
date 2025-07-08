import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: false,
  },
  state: {
    type: String,
    required: false
  },
  diseases: [{
    type: String,
    required: false
  }],
  prescriptions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prescription'
  }],
  reminders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reminder'
  }],
  profilepicture:{
     public_id: String,
       url: String,
  },
  matchedSchemes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scheme'
  }]
}, {
  timestamps: true 
});

const User=mongoose.model('User',userschema);
export default User;
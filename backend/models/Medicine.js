import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  usage: {
    type: String
  },

  dosage: {
    type: String
  },

  sideEffects: {
    type: [String]
  },

  precautions: {
    type: [String]
  },

  storageInstructions: {
    type: String
  },

  category: {
    type: String 
  },

  isGeneric: {
    type: Boolean,
    default: false
  },

  alternatives: [
    {
      name: String,
      price: String,
      link: String 
    }
  ],

  manufacturers: [String], // Optional

  price: {
    type: String
  },

  buyLinks: [
    {
      pharmacy: String, 
      url: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;

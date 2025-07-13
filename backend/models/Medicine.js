import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  composition: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true
  },

  uses: {
    type: String
  },

  dosage: {
    type: String
  },

  sideEffects: [String],

  precautions: [String],

  storageInstructions: {
    type: String
  },

  type: {
    type: String // e.g., Tablet, Syrup, Injection
  },

  isGeneric: {
    type: Boolean,
    default: false
  },

  isPrescriptionRequired: {
    type: Boolean,
    default: false
  },

  diseases: [String], // For relevance checks

  alternatives: [
    {
      name: String,
      price: String,
      link: String 
    }
  ],

  manufacturers: [String],

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

const Medicine = mongoose.models.Medicine || mongoose.model("Medicine", medicineSchema);

export default Medicine;

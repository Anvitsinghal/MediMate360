import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String,
    required: true
  },

  benefits: {
    type: [String], 
  },

  eligibility: {
    ageRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 100 }
    }
    },
    gender: {
      type: [String], 
      default: ['any']
    },
    states: {
      type: [String], 
      default: ['All']
    },
    diseasesCovered: {
      type: [String] 
    },
    incomeLimit: {
      type: Number 
    },
    otherCriteria: {
      type: String 
    },
    schemeImage:{
       public_id: String,
       url: String,
    },
  

  documentsRequired: {
    type: [String]
  },

  applyLink: {
    type: String 
  },

  helpline: {
    type: String
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;

import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  medicineName: {
    type: String,
    
  },

  dosage: {
    type: String, 
  },

  time: {
    type: String,
    required: true
  },

  days: {
    type: [String],
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },

  endDate: {
    type: Date
  },

  method: {
    type: String,
    enum: ['email', 'notification'],
    default: 'email'
  },

  message: {
    type: String,
    default: 'Time to take your medicine'
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

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;

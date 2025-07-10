import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reminders: [],
};

const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    setReminders: (state, action) => {
      state.reminders = action.payload;
    },
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(r => r._id !== action.payload);
    },
  },
});

export const { setReminders, addReminder, deleteReminder } = reminderSlice.actions;
export default reminderSlice.reducer;

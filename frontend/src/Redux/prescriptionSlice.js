import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  prescriptions: [],
};

const prescriptionSlice = createSlice({
  name: 'prescription',
  initialState,
  reducers: {
    setPrescriptions: (state, action) => {
      state.prescriptions = action.payload;
    },
    addPrescription: (state, action) => {
      state.prescriptions.push(action.payload);
    },
  },
});

export const { setPrescriptions, addPrescription } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;

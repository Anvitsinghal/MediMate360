import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  medicines: [],
  selectedMedicine: null,
};

const medicineSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    setMedicines: (state, action) => {
      state.medicines = action.payload;
    },
    selectMedicine: (state, action) => {
      state.selectedMedicine = action.payload;
    },
  },
});

export const { setMedicines, selectMedicine } = medicineSlice.actions;
export default medicineSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schemes: [],
};

const schemeSlice = createSlice({
  name: 'scheme',
  initialState,
  reducers: {
    setSchemes: (state, action) => {
      state.schemes = action.payload;
    },
  },
});

export const { setSchemes } = schemeSlice.actions;
export default schemeSlice.reducer;

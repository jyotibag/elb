import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listBrands: [],
};

const brandSlice = createSlice({
  name: "brands",
  initialState: initialState,
  reducers: {
    setListBrand: (state, action) => {
      state.listBrands = action.payload;
    },
  },
});

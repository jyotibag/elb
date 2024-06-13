import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: [],
  listCategories: [],
  parentCategories: [],
  editId: "",
  deleteId: "",
  deleteModal: false,
};

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setAllCategories: (state, action) => {
      state.allCategories = action.payload;
    },
    unsetAllCategories: (state) => {
      state.allCategories = [];
    },
    setListCategories: (state, action) => {
      state.listCategories = action.payload;
    },
    unsetListCategories: (state) => {
      state.listCategories = [];
    },
    setParentCategories: (state, action) => {
      state.parentCategories = action.payload;
    },
    unsetParentCategories: (state) => {
      state.parentCategories = [];
    },
    setEditCategory: (state, action) => {
      state.editId = action.payload;
    },
    unsetEditCategory: (state) => {
      state.editId = "";
    },
    setDeleteCategory: (state, action) => {
      state.deleteModal = true;
      state.deleteId = action.payload;
    },
    unsetDeleteCategory: (state) => {
      state.deleteModal = false;
      state.deleteId = "";
    },
  },
});

export const {
  setAllCategories,
  unsetAllCategories,
  setListCategories,
  unsetListCategories,
  setParentCategories,
  unsetParentCategories,
  setEditCategory,
  unsetEditCategory,
  setDeleteCategory,
  unsetDeleteCategory,
} = categorySlice.actions;
export default categorySlice.reducer;

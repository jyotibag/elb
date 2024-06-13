import React from "react";
import { Outlet } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { setListRoles } from "../feature/masters/roleSlice";
import {
  setAllCategories,
  setParentCategories,
} from "../feature/masters/categorySlice";

// Loader starts ------
export const loader = (store) => async () => {
  const { listRoles } = store.getState().roles;
  const { parentCategories, allCategories } = store.getState().categories;

  try {
    if (listRoles.length === 0) {
      const roleResponse = await customFetch.get(`/masters/roles`);
      store.dispatch(setListRoles(roleResponse.data.data.rows));
    }

    if (parentCategories.length === 0) {
      const pcategories = await customFetch.get(`/masters/categories/parents`);
      store.dispatch(setParentCategories(pcategories.data.data.rows));
    }

    if (allCategories.length === 0) {
      const acategories = await customFetch.get(`/masters/categories`);
      store.dispatch(setAllCategories(acategories.data.data.rows));
    }
    return null;
  } catch (error) {
    return error;
  }
};

// Main component starts ------
const LayoutAdmin = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default LayoutAdmin;

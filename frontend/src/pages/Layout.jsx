import React from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";

import "../assets/dist/css/tabler.min.css";
import "../assets/dist/css/demo.min.css";

import "../assets/dist/js/tabler.min.js";
import "../assets/dist/js/demo.min.js";

import customFetch from "../utils/customFetch.js";
import { splitErrors } from "../utils/showErrors.jsx";
import {
  setCurrentUser,
  unsetCurrentUser,
} from "../feature/currentUserSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AdminSidebar, UserSidebar, Topnav, Footer } from "../components";

// Loader starts ------
export const loader = (store) => async () => {
  const { currentUser } = store.getState().currentUser;
  try {
    if (!currentUser.first_name) {
      const response = await customFetch.get(`/auth/current-user`);
      store.dispatch(setCurrentUser(response.data.data.rows[0]));
      
    }
    return null;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect("/sign-in");
  }
};

// Main component starts ------
const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((store) => store.currentUser);

  const logout = async () => {
    try {
      await customFetch.get(`/auth/logout`);

      dispatch(unsetCurrentUser());
      localStorage.removeItem("token");

      toast.success(`Thank you for visiting`);

      navigate(`/sign-in`);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <>
      <Topnav logout={logout} />
      {currentUser.role_id === 1 || currentUser.role_id === 2 ? (
        <AdminSidebar />
      ) : (
        <UserSidebar />
      )}
      <div className="page-wrapper">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;

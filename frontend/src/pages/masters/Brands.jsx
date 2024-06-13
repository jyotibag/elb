import React, { useEffect, useState } from "react";

import customFetch from "../../utils/customFetch";
import { BrandAddEdit } from "../../components";

const Brands = () => {
  

  const fetchData = async()=>{
    try {
      const response = await customFetch.get("/masters/brands/all");
      console.log(response.data.data.rows);
    } catch (error) {
      
    }
  }
   useEffect(() =>{
    fetchData()
   },[]);

  document.title = `List of All Brands | ${import.meta.env.VITE_APP_TITLE}`;
  return (<>
    <BrandAddEdit />
  </>
  );
};

export default Brands;

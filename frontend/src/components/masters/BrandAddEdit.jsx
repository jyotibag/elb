import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SubmitBtn } from "../../components";
import { nanoid } from "nanoid";
import customFetch from "../../utils/customFetch";
import { splitErrors } from "../../utils/showErrors";

const BrandAddEdit = () => {
  const { parentCategories, allCategories, editId } = useSelector((store) => store.categories);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    
    const api = `/masters/brands`;
    const msg = `Brand added`;

    try {
      
      const fetchData = await customFetch.post("/masters/brands/add",data);
      console.log(fetchData);
      toast.success(msg);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };
  
  return (<>
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Add Brand
          </h2>
          <hr style={{ margin: "1rem 0" }} />
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label required" htmlFor="parentId">
                  Choose category
                </label>
                <select
                  className="form-select"
                  name="parentId"
                  id="parentId"
                >
                  <option value="">Select</option>
                  {parentCategories?.map((i) => {
                    
                    return (
                      <option key={nanoid()} value={i.id}>
                        {i.category.toUpperCase()}
                      </option>
                    );
                  })}
                </select>
            </div>
            <div className="mb-3">
              <label className="form-label required" htmlFor="brand">
                Brand name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                name="brand"
                id="brand"/>
            </div>
            <hr style={{ margin: "1rem 0" }} />
            <div className="form-footer text-end">
              <hr style={{ margin: "1rem 0" }} />
              <div className="form-footer text-end">
                <SubmitBtn
                  className={`btn btn-success`}
                  text={`Add`}
                />
                <button
                  type="button"
                  className="btn btn-default ms-3">
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>);
};

export default BrandAddEdit;

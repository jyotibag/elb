import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <h3>Home page!</h3>
      <Link className="btn btn-success btn-md" to={`/sign-in`}>
        Sign In
      </Link>
    </>
  );
};

export default Landing;

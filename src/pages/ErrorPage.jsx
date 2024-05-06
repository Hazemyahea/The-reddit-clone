import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="p-5">
      <h3 className=" font-black w-fit ">The Page Not Found ! </h3>
      <p>
        Back To Home Bage{" "}
        <Link className=" text-blue-700" to="/">
          Home
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;

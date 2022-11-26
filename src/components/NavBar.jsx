import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../auth/firebase";

//? Context
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-blue-600">
      <div className="px-3">
        <Link to={"/"} className="text-3xl">
          Movie App
        </Link>
      </div>

         {/* Kullanıcı girişi olup olmadığını kontrol edip ona göre navbarı düzenleyen yapı*/}
      {currentUser ? (
        <div className="flex gap-x-6 mr-10 items-center justify-center">
          <h3 className="text-capitalize text-2xl">
            {currentUser.displayName}
          </h3>
          <button
            className="px-3 py-1 text-lg border-2 rounded-md cursor-pointer hover:bg-white hover:text-blue-600 duration-300"
            onClick={() => logOut()}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-x-4 mr-10">
          <button
            className="px-3 py-1 text-lg border-2 rounded-md cursor-pointer hover:bg-white hover:text-blue-600 duration-300 "
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-3 py-1 text-lg border-2 rounded-md cursor-pointer hover:bg-white hover:text-blue-600 duration-300 "
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;

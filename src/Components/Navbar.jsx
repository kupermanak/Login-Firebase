import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let navigate = useNavigate();

  const logout = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="navbar navbar-dark bg-dark">
      <NavLink to="/" className="mx-3 navbar-brand">
        React Admin
      </NavLink>
      <div className="d-flex">
        <NavLink className="btn btn-dark mr-2" to="/">
          Inicio
        </NavLink>

        {props.user !== null ? (
          <NavLink className="btn btn-dark mr-2" to="/admin">
            Admin
          </NavLink>
        ) : null}

        {props.user !== null ? (
          <button className="btn btn-dark" onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <NavLink className="btn btn-dark" to="/login">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;

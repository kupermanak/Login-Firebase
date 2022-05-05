import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [user, setUser] = React.useState(null);

  let navigate = useNavigate();

  React.useEffect(() => {
    if (auth.currentUser) {
      console.log("existe el usuario");
      setUser(auth.currentUser);
    } else {
      console.log("no existe el usuario");
      navigate("/login");
    }
  }, []);

  return <div>{user !== null ? <h2>{user.email}</h2> : null}</div>;
};

export default Admin;

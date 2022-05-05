import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = React.useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user !== false ? (
    <div>
      <Router>
        <div className="container">
          <Navbar user={user} />
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  ) : (
    <div className="fas fa-spinner fa-pulse fa-6x">CARGANDO...</div>
  );
}

export default App;

import React from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [error, setError] = React.useState(null);
  const [esRegistro, setEsRegistro] = React.useState(false);

  const procesarDatos = (e) => {
    e.preventDefault();
    if (!email.trim() && !pass.trim()) {
      // console.log("Datos vacíos email!");
      setError("Datos vacíos email!");
      return;
    }
    if (!pass.trim()) {
      // console.log("Datos vacíos pass!");
      setError("Datos vacíos pass!");
      return;
    }
    if (pass.length < 6) {
      // console.log("6 o más carácteres");
      setError("6 o más carácteres en pass");
      return;
    }
    // console.log("correcto...");
    setError(null);
    setEmail("");
    setPass("");

    if (esRegistro) {
      registrar();
    } else {
      login();
    }
  };

  let navigate = useNavigate();

  const login = React.useCallback(async () => {
    const res = await auth.signInWithEmailAndPassword(email, pass);
    console.log(res.user);
    setEmail(null);
    setEmail("");
    setPass("");
    navigate("/admin");
  }, [email, pass]);

  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, pass);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      setError(null);
      setEmail("");
      setPass("");
    } catch (e) {
      if (e.code === "auth/invalid-email") {
        setError("Email no valido");
      }
      if (e.code === "auth/email-already-in-use") {
        setError("Email existente");
      }
      console.log(e);
    }
  }, [email, pass]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuario" : "Login"}
      </h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={procesarDatos}>
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese Contraseña"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />
            <button
              className="btn btn-lg btn-dark btn-block w-100"
              type="submit"
            >
              {esRegistro ? "Crear cuenta" : "ingresar"}
            </button>
            <button
              className="btn btn-sm btn-info btn-block w-100 mt-2"
              type="button"
              onClick={() => setEsRegistro(!esRegistro)}
            >
              {!esRegistro ? "Crear usuario" : "ya tengo cuenta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

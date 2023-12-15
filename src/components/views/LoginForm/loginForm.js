import React, { useEffect, useRef, useState } from "react";
import "./loginForm.css";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";

import { useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = "/api/cmovilv3/usuario/login/web";
const LoginForm = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const userRef = useRef();
  const errRef = useRef();

  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [usuario, contrasenia]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ usuUsuario: usuario, usuClave: contrasenia }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.token;
      setAuth({
        usuario,
        contrasenia,
        accessToken,
      });
      setUsuario("");
      setContrasenia("");
      navigate(from, { replace: true });
      localStorage.setItem("token", accessToken);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg(
          "Usuario o Contraseña incorrecto, por favor verifique sus datos"
        );
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="page">
      <form onSubmit={handleSubmit}>
        <div className="cover">
          <h1>Login</h1>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <input
            placeholder="usuario"
            type="text"
            id="usuario"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUsuario(e.target.value)}
            value={usuario}
            required
          />

          <input
            placeholder="password"
            type="password"
            id="contrasenia"
            onChange={(e) => setContrasenia(e.target.value)}
            value={contrasenia}
            required
          />

          <button className="login-btn">Ingresar</button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;

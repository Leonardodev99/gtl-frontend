import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login bem-sucedido
    navigate("/dashboard");
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <img src={logo} alt="Logo GTL" className="login-logo" />
        <h1 className="login-title">GTL</h1>
        <p className="login-subtitle">Gestão de Trânsito em Luanda</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" placeholder="Usuário" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Senha" required />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Esqueceu a senha?
        </p>

      </div>
    </div>
  );
}

export default Login;

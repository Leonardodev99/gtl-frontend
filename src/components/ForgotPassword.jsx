import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.css";
import logo from "../assets/logo.png";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Por favor, insira o e-mail cadastrado.");
      return;
    }

    // Simulação do envio do e-mail de recuperação
    setTimeout(() => {
      setMessage("📧 Um link de recuperação foi enviado para o seu e-mail.");
      setTimeout(() => navigate("/login"), 3000);
    }, 1500);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <img src={logo} alt="Logo" className="forgot-logo" />
        <h1>Recuperar Conta</h1>
        <p className="subtitle">
          Insira o e-mail associado à sua conta para receber o link de recuperação.
        </p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="forgot-input"
          />
          <button type="submit" className="forgot-button">
            Enviar Link
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <button onClick={() => navigate("/login")} className="back-button">
          ← Voltar para o login
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;

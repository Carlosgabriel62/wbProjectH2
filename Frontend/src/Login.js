import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [mensagem, setMensagem] = useState(""); 
  const navigate = useNavigate(); 

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("authToken", data.token);
        setMensagem(data.message);
        navigate("/gerenciador");
      } else {
        setMensagem(data.message); 
      }
    } catch (error) {
      setMensagem("Erro na requisição: " + error.message); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>

      {/* Exibindo a mensagem de sucesso ou erro */}
      <div>{mensagem}</div>
    </div>
  );
}

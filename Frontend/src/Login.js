import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [mensagem, setMensagem] = useState(""); // Para exibir a mensagem de erro
  const navigate = useNavigate(); // Hook para redirecionar

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
        localStorage.setItem("authToken", data.token); // Salva o token
        setMensagem(data.message);
        navigate("/gerenciador"); // Redireciona para gerenciador após login bem-sucedido
      } else {
        setMensagem(data.message); // Exibe a mensagem de erro
      }
    } catch (error) {
      setMensagem("Erro na requisição: " + error.message); // Erro de rede
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

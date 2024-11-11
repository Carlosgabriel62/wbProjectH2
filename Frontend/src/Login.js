import React, { useState } from "react";
import "./login.css";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [mensagem, setMensagem] = useState(""); // Para exibir a mensagem de sucesso ou erro

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Fazendo a requisição para o login usando POST
      const response = await fetch("/api/usuarios/login", {
        method: "POST", // Usando POST para segurança
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Enviando o corpo com email e senha
      });

      if (response.ok) {
        const data = await response.json();
        setMensagem(data); // Exibe a mensagem retornada pela API
      } else {
        setMensagem("Login incorreto: usuário ou senha inválidos");
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirecionamento
import "./cadastro.css";

export function Cadastro() {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    nome: "",
  });

  const navigate = useNavigate(); // Hook para navegação

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = {
      email: formData.email,
      senha: formData.senha,
      nome: formData.nome,
    };

    try {
      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Usuário criado:", data);

        // Supondo que o backend retorna um token após o cadastro
        const token = data.token; // Altere se o token estiver em outro formato ou estrutura
        if (token) {
          // Salvar o token no localStorage
          localStorage.setItem("authToken", token);

          // Redirecionar para a página do Gerenciador
          navigate("/gerenciador"); // Substitua pelo caminho correto para o Gerenciador
        }
      } else {
        console.error("Erro ao criar usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Senha:
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
        />
      </label>
      <label>
        Nome:
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

import React, { useState } from "react";
import styles from "./gerenciador.module.css";

export function Gerenciador() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarExcluir, setMostrarExcluir] = useState(false);
  const [mostrarAcompanhar, setMostrarAcompanhar] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [novoProjeto, setNovoProjeto] = useState({
    nome: "",
    motivo: "",
    cnpjCpf: "",
  });
  const [mostrarBotaoVoltar, setMostrarBotaoVoltar] = useState(false);

  const handleCriarProjetoClick = () => {
    setMostrarFormulario(true);
    setMostrarExcluir(false);
    setMostrarAcompanhar(false);
    setMostrarBotaoVoltar(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovoProjeto((prevProjeto) => ({
      ...prevProjeto,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/projetos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoProjeto),
      });

      if (response.ok) {
        const data = await response.json();
        setProjetos((prevProjetos) => [...prevProjetos, data]);
      } else {
        console.error("Erro ao criar projeto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleExcluirProjetoClick = () => {
    setMostrarExcluir(true);
    setMostrarFormulario(false);
    setMostrarAcompanhar(false);
    setMostrarBotaoVoltar(true);
    handleAcompanharProjetosClick();
  };

  const handleAcompanharProjetosClick = async () => {
    setMostrarAcompanhar(true);
    setMostrarFormulario(false);
    setMostrarExcluir(false);
    setMostrarBotaoVoltar(true);

    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjetos(data);
      } else {
        console.error("Erro ao buscar projetos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const handleEncerrarProjeto = async (id) => {
    try {
      const response = await fetch(`/api/projetos/${id}/encerrar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedProjetos = projetos.map((projeto) =>
          projeto.id === id ? { ...projeto, status: "ENCERRADO" } : projeto
        );
        setProjetos(updatedProjetos);
      } else {
        console.error("Erro ao encerrar o projeto");
      }
    } catch (error) {
      console.error("Erro ao encerrar o projeto:", error);
    }
  };

  const handleVoltar = () => {
    setMostrarFormulario(false);
    setMostrarExcluir(false);
    setMostrarAcompanhar(false);
    setMostrarBotaoVoltar(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Aqui você pode gerenciar todos os seus projetos</h1>

      {!mostrarFormulario && !mostrarExcluir && !mostrarAcompanhar && (
        <>
          <button onClick={handleCriarProjetoClick} className={styles.criarButton}>
            Criar novo projeto de doação
          </button>
          <button onClick={handleExcluirProjetoClick} className={styles.criarButton}>
            Encerrar um projeto
          </button>
          <button onClick={handleAcompanharProjetosClick} className={styles.criarButton}>
            Acompanhar projetos
          </button>
        </>
      )}

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Nome do Projeto:</label>
          <input
            type="text"
            name="nome"
            value={novoProjeto.nome}
            onChange={handleChange}
            required
          />
          <label>Motivo do Projeto:</label>
          <input
            type="text"
            name="motivo"
            value={novoProjeto.motivo}
            onChange={handleChange}
            required
          />
          <label>CNPJ ou CPF:</label>
          <input
            type="text"
            name="cnpjCpf"
            value={novoProjeto.cnpjCpf}
            onChange={handleChange}
            required
          />
          <button type="submit">Criar Projeto</button>
        </form>
      )}

      {mostrarAcompanhar && (
        <div>
          <h2>Todos os Projetos:</h2>
          <ul>
            {projetos.map((projeto) => (
              <li key={projeto.id}>
                {projeto.nome} - Status: {projeto.status}
                {projeto.status !== "ENCERRADO" && (
                  <button onClick={() => handleEncerrarProjeto(projeto.id)}>
                    Encerrar Projeto
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mostrarBotaoVoltar && (
        <button onClick={handleVoltar} className={styles.voltarButton}>
          Voltar
        </button>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
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
  const [mostrarBotaoVoltar, setMostrarBotaoVoltar] = useState(false); // Novo estado

  // Função para criar um novo projeto
  const handleCriarProjetoClick = () => {
    setMostrarFormulario(true);
    setMostrarExcluir(false);
    setMostrarAcompanhar(false);
    setMostrarBotaoVoltar(true); // Exibe o botão Voltar
  };

  // Função para controlar a mudança nos campos do formulário
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNovoProjeto((prevProjeto) => ({
      ...prevProjeto,
      [name]: value,
    }));
  };

  // Função para enviar o novo projeto à API
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
        console.log("Projeto criado:", data);
        setProjetos((prevProjetos) => [...prevProjetos, data]);
      } else {
        console.error("Erro ao criar projeto:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Função para exibir a lista de projetos para o encerramento
  const handleExcluirProjetoClick = () => {
    setMostrarExcluir(true);
    setMostrarFormulario(false);
    setMostrarAcompanhar(false);
    setMostrarBotaoVoltar(true); // Exibe o botão Voltar

    // Buscar os projetos da API para a exclusão
    handleAcompanharProjetosClick("excluir");
  };

  // Função para exibir a lista de projetos para acompanhamento ou encerramento
  const handleAcompanharProjetosClick = async (tipo = "acompanhar") => {
    if (tipo === "excluir") {
      setMostrarAcompanhar(false);
      setMostrarExcluir(true);
    } else {
      setMostrarExcluir(false);
      setMostrarAcompanhar(true);
    }
    setMostrarFormulario(false);
    setMostrarBotaoVoltar(true); // Exibe o botão Voltar
  
    // Buscar os projetos da API e filtrar os com status "EM ANDAMENTO"
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        // Filtrando os projetos com status "EM ANDAMENTO"
        const projetosEmAndamento = data.filter((projeto) => projeto.status === "EM ANDAMENTO");
        setProjetos(projetosEmAndamento);
      } else {
        console.error("Erro ao buscar projetos:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  // Função para encerrar o projeto
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
        console.log("Projeto encerrado com sucesso");
      } else {
        console.error("Erro ao encerrar o projeto");
      }
    } catch (error) {
      console.error("Erro ao encerrar o projeto:", error);
    }
  };

  // Função para voltar ao gerenciador
  const handleVoltar = () => {
    setMostrarFormulario(false);
    setMostrarExcluir(false);
    setMostrarAcompanhar(false);
    setMostrarBotaoVoltar(false); // Esconde o botão Voltar
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Aqui você pode gerenciar todos os seus projetos</h1>

      {/* Botões de Navegação */}
      {!mostrarFormulario && !mostrarExcluir && !mostrarAcompanhar && (
        <>
          <button onClick={handleCriarProjetoClick} className={styles.criarButton}>
            Criar novo projeto de doação
          </button>
          <button onClick={handleExcluirProjetoClick} className={styles.criarButton}>
            Encerrar um projeto
          </button>
          <button onClick={() => handleAcompanharProjetosClick()} className={styles.criarButton}>
            Acompanhar projetos
          </button>
        </>
      )}

      {/* Formulário para criação de projeto */}
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

      {/* Exibição de projetos para acompanhamento */}
      {mostrarAcompanhar && (
        <div>
          <h2>Projetos em andamento:</h2>
          <ul>
            {projetos.map((projeto) => (
              <li key={projeto.id}>
                {projeto.nome} - Status: {projeto.status}
                <button onClick={() => handleEncerrarProjeto(projeto.id)}>
                  Encerrar Projeto
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botão Voltar */}
      {mostrarBotaoVoltar && (
        <button onClick={handleVoltar} className={styles.voltarButton}>
          Voltar
        </button>
      )}
    </div>
  );
}

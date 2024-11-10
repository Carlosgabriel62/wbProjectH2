import React, { useState, useEffect } from "react";
import styles from "./gerenciador.module.css"; 

export function Gerenciador() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarExcluir, setMostrarExcluir] = useState(false);
  const [mostrarAcompanhar, setMostrarAcompanhar] = useState(false);
  const [projetos, setProjetos] = useState([]);
  const [novoProjeto, setNovoProjeto] = useState({ nome: "", motivo: "", cnpjCpf: "" });

  const handleCriarProjetoClick = () => {
    setMostrarFormulario(true);
    setMostrarExcluir(false);
    setMostrarAcompanhar(false);
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
      const response = await fetch('/api/projetos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const handleExcluirProjetoClick = () => {
    setMostrarExcluir(true);
    setMostrarFormulario(false);
    setMostrarAcompanhar(false);
    fetchProjetos();
  };

  const handleAcompanharProjetosClick = async () => {
    setMostrarAcompanhar(true);
    setMostrarFormulario(false);
    setMostrarExcluir(false);

    // Buscar os projetos da API
    try {
      const response = await fetch('/api/projetos');
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

  const handleExcluirProjeto = (id) => {
    setProjetos(projetos.filter((projeto) => projeto.id !== id));
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
            Excluir um projeto
          </button>
          <button onClick={handleAcompanharProjetosClick} className={styles.criarButton}>
            Acompanhar projetos
          </button>
        </>
      )}

      {mostrarFormulario && (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <label className={styles.label}>Nome do Projeto</label>
          <input
            type="text"
            name="nome"
            value={novoProjeto.nome}
            onChange={handleChange}
            className={styles.input}
            placeholder="Digite o nome do projeto"
          />

          <label className={styles.label}>Motivo para a Doação</label>
          <textarea
            name="motivo"
            value={novoProjeto.motivo}
            onChange={handleChange}
            className={styles.textarea}
            placeholder="Descreva o motivo para a doação"
          ></textarea>

          <label className={styles.label}>CNPJ/CPF</label>
          <input
            type="text"
            name="cnpjCpf"
            value={novoProjeto.cnpjCpf}
            onChange={handleChange}
            className={styles.input}
            placeholder="Digite o CNPJ ou CPF"
          />

          <button type="submit" className={styles.submitButton}>Enviar Projeto de Doação</button>
        </form>
      )}

      {mostrarExcluir && (
        <div className={styles.formContainer}>
          <h2>Selecione o projeto a ser excluído</h2>
          {projetos.map((projeto) => (
            <div key={projeto.id} className={styles.projetoItem}>
              <span>{projeto.nome}</span>
              <button onClick={() => handleExcluirProjeto(projeto.id)} className={styles.deleteButton}>Excluir</button>
            </div>
          ))}
        </div>
      )}

      {mostrarAcompanhar && (
        <div className={styles.formContainer}>
          <h2>Acompanhe o status dos seus projetos</h2>
          {projetos.map((projeto) => (
            <div key={projeto.id} className={styles.projetoItem}>
              <span><strong>Nome:</strong> {projeto.nome}</span>
              <span><strong>Motivo:</strong> {projeto.motivo}</span>
              <span><strong>CNPJ/CPF:</strong> {projeto.cnpjCpf}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

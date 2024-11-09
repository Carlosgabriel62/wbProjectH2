import React, { useState } from "react";
import styles from "./gerenciador.module.css"; 

export function Gerenciador() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarExcluir, setMostrarExcluir] = useState(false);
  const [mostrarAcompanhar, setMostrarAcompanhar] = useState(false);
  const [projetos, setProjetos] = useState([]); // Aqui você guardaria os projetos (exemplo simulado)

  const handleCriarProjetoClick = () => {
    setMostrarFormulario(true);
  };

  const handleExcluirProjetoClick = () => {
    setMostrarExcluir(true);
    // Simulando a obtenção de projetos da API
    setProjetos([
      { id: 1, nome: "Projeto A" },
      { id: 2, nome: "Projeto B" },
    ]);
  };

  const handleAcompanharProjetosClick = () => {
    setMostrarAcompanhar(true);
    // Simulando a obtenção de projetos com status da API
    setProjetos([
      { id: 1, nome: "Projeto A", status: "Em andamento" },
      { id: 2, nome: "Projeto B", status: "Concluído" },
    ]);
  };

  const handleExcluirProjeto = (id) => {
    // Aqui você faria a chamada para a API para excluir o projeto
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
        <div className={styles.formContainer}>
          <label className={styles.label}>Nome do Projeto</label>
          <input type="text" className={styles.input} placeholder="Digite o nome do projeto" />

          <label className={styles.label}>Motivo para a Doação</label>
          <textarea className={styles.textarea} placeholder="Descreva o motivo para a doação"></textarea>

          <label className={styles.label}>CNPJ/CPF</label>
          <input type="text" className={styles.input} placeholder="Digite o CNPJ ou CPF" />

          <button className={styles.submitButton}>Enviar Projeto de Doação</button>
        </div>
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
              <span>{projeto.nome} - {projeto.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
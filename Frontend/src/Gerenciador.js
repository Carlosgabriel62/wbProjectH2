import React, { useState, useEffect } from "react";
import styles from "./gerenciador.module.css";

export function Gerenciador() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarExcluir, setMostrarExcluir] = useState(false);
    const [mostrarAcompanhar, setMostrarAcompanhar] = useState(false);
    const [projetos, setProjetos] = useState([]);
    const [novoProjeto, setNovoProjeto] = useState({ nome: "", motivo: "", cnpjCpf: "" });

    // Função para criar um novo projeto
    const handleCriarProjetoClick = () => {
        setMostrarFormulario(true);
        setMostrarExcluir(false);
        setMostrarAcompanhar(false);
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

    // Função para exibir a lista de projetos para encerramento
    const handleExcluirProjetoClick = () => {
        setMostrarExcluir(true);
        setMostrarFormulario(false);
        setMostrarAcompanhar(false);

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

        // Buscar os projetos da API
        try {
            const response = await fetch('/api/projects');
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

    // Função para encerrar o projeto
    const handleEncerrarProjeto = async (id) => {
        try {
            const response = await fetch(`/api/projetos/${id}/encerrar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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
                    <button onClick={() => handleAcompanharProjetosClick("acompanhar")} className={styles.criarButton}>
                        Acompanhar projetos
                    </button>
                </>
            )}

            {/* Formulário para Criar um Novo Projeto */}
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

                    <button type="submit" className={styles.submitButton}>
                        Enviar Projeto de Doação
                    </button>
                </form>
            )}

            {/* Listagem de Projetos para Encerramento */}
            {mostrarExcluir && (
                <div className={styles.formContainer}>
                    <h2>Selecione o projeto a ser encerrado</h2>
                    {projetos.map((projeto) => (
                        <div key={projeto.id} className={styles.projetoItem}>
                            <span>{projeto.nome}</span>
                            <button
                                onClick={() => handleEncerrarProjeto(projeto.id)}
                                className={styles.deleteButton}
                            >
                                Encerrar
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Acompanhar Projetos */}
            {mostrarAcompanhar && (
                <div className={styles.formContainer}>
                    <h2>Acompanhe o status dos seus projetos</h2>
                    {projetos.map((projeto) => (
                        <div key={projeto.id} className={styles.projetoItem}>
                            <span><strong>Nome:</strong> {projeto.nome}</span>
                            <span><strong>Motivo:</strong> {projeto.motivo}</span>
                            <span><strong>CNPJ/CPF:</strong> {projeto.cnpjCpf}</span>
                            <span><strong>Status:</strong> {projeto.status}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

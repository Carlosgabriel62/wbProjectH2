import React, { useState, useEffect } from "react";

export function Projetos() {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    // Requisição para buscar projetos com status "EM ANDAMENTO"
    const fetchProjetos = async () => {
      try {
        const response = await fetch("/api/projetos/andamento");
        const data = await response.json();
        setProjetos(data);
      } catch (error) {
        console.error("Erro ao carregar projetos", error);
      }
    };

    fetchProjetos();
  }, []);

  return (
    <div>
      <h1>Conheça os projetos de doações em andamento</h1>
      <p>Se junte para a doação e faça a diferença!</p>
      
      {projetos.length > 0 ? (
        <ul>
          {projetos.map((projeto) => (
            <li key={projeto.id}>
              <strong>{projeto.nome}</strong> - {projeto.motivo}
              <p>Status: {projeto.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum projeto em andamento no momento.</p>
      )}
    </div>
  );
}

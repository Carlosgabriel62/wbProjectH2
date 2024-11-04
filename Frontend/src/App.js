import React, { useState } from "react";
import "./styles.css";
import { Cadastro } from "./Cadastro";
import { Login } from "./Login";

export default function App() {
  const [mostrarCadastro, setMostrarCadastro] = useState(false);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  const handleCadastroClick = () => {
    setMostrarCadastro(true);
    setMostrarLogin(false);
  };

  const handleLoginClick = () => {
    setMostrarLogin(true);
    setMostrarCadastro(false);
  };

  const handleLogoClick = () => {
    setMostrarCadastro(false);
    setMostrarLogin(false);
  };

  return (
    <div className="App">
      <header className="header">
        <a href="/" onClick={handleLogoClick} className="logo-link">
          <img
            src="https://exatusassessoria.com.br/wp-content/uploads/2018/02/doacoes-800x520.png"
            alt="Logo"
            className="logo"
          />
        </a>
        <nav>
          <button onClick={handleLoginClick}>Área do Doador</button>
          <button onClick={handleCadastroClick}>Faça seu cadastro</button>
        </nav>
      </header>
      <main className="main-content">
        {!mostrarCadastro && !mostrarLogin && (
          <div className="hero">
            <h1>Doações transformam o mundo.</h1>
            <p>
              A sua doação pode fazer a diferença! Juntos, estamos criando um
              futuro mais justo e solidário para todos. Com a sua ajuda,
              conseguimos levar recursos essenciais para comunidades carentes,
              apoiar projetos de educação, saúde e muito mais. Participe dessa
              corrente do bem e ajude a transformar vidas.
            </p>
            <button className="cta-button">Doe agora e seja parte da mudança!</button>
          </div>
        )}
        {mostrarCadastro && <Cadastro />}
        {mostrarLogin && <Login />}
      </main>
    </div>
  );
}

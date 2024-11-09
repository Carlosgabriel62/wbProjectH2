import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import { Cadastro } from "./Cadastro";
import { Login } from "./Login";
import { Gerenciador } from "./Gerenciador";

export default function App() {
  return (
    <Router>
      <div className="App">
        <header className="header">
          <Link to="/" className="logo-link">
            <img
              src="https://exatusassessoria.com.br/wp-content/uploads/2018/02/doacoes-800x520.png"
              alt="Logo"
              className="logo"
            />
          </Link>
          <nav>
            <Link to="/login">
              <button>Área do Doador</button>
            </Link>
            <Link to="/cadastro">
              <button>Faça seu cadastro</button>
            </Link>
            <Link to="/gerenciador">
              <button>Gerencie seus projetos</button>
            </Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/gerenciador" element={<Gerenciador />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
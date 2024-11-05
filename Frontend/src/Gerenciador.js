import React, { useState } from "react";

export function Gerenciador(){
return(
    <div>
        <h1>Aqui você pode gerenciar todas seus projetos</h1>
        <button>Criar novo projeto de doação</button>
        <label>Qual o título do seu projeto?</label>
        <input type="text"/>
        <p>Descrição</p>
        <textarea></textarea>
        <button>Encerrar projeto de doação</button>
        <p>Qual desses projetos você deseja excluir?</p>
        <button>Acompanhar projeto de doação</button>
        <p>Esses são os seus projetos</p>
    </div>

);
}
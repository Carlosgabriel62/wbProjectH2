package com.example.demo;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProjetoController {
    private final ProjetoManager manager;

    public ProjetoController(ProjetoManager manager) {
        this.manager = manager;
    }

@PostMapping("/projetos")
public ResponseEntity<String> createProjeto(@RequestBody Projeto projeto) {
    try {
        manager.adicionarProjeto(projeto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Adicionado"); // Retorna 201 com a mensagem
    } catch (Exception ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Projeto já cadastrado"); // Retorna 409 com a mensagem
    }
}


    @GetMapping("/projetos")
    public List<Projeto> listarProjeto(){
        return manager.listarProjetos();
    }
    
}

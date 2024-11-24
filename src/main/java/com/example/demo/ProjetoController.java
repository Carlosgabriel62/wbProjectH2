package com.example.demo;

import java.util.List;
import java.util.stream.Collectors;

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
        return ResponseEntity.status(HttpStatus.CREATED).body("Adicionado");
    } catch (Exception ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Projeto já cadastrado"); 
    }
}


    @GetMapping("/projetos/andamento")
    public List<Projeto> listarProjetosEmAndamento() {
        List<Projeto> todosProjetos = manager.listarProjetos();
        return todosProjetos.stream()
                            .filter(projeto -> "EM ANDAMENTO".equals(projeto.getStatus()))
                            .collect(Collectors.toList());
    }

    @GetMapping("/projects")
    public List<Projeto> listarProjeto(){
        return manager.listarProjetos();
    }
    

    @PutMapping("/projetos/{id}/encerrar")
    public ResponseEntity<String> encerrarProjeto(@PathVariable int id) {
        try {
            manager.encerrarProjeto(id);
            return ResponseEntity.ok("Projeto encerrado com sucesso");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Projeto não encontrado");
        }
    }
}

package com.example.demo;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class InstituicaoController {
    private final InstituicaoManager manager;

    public InstituicaoController(InstituicaoManager manager) {
        this.manager = manager;
    }

@PostMapping("/usuarios")
public ResponseEntity<String> createUsuario(@RequestBody Instituicao instituicao) {
    try {
        manager.adicionarInstituicao(instituicao);
        return ResponseEntity.status(HttpStatus.CREATED).body("Adicionado"); // Retorna 201 com a mensagem
    } catch (Exception ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Usuário já cadastrado"); // Retorna 409 com a mensagem
    }
}


    @GetMapping("/users")
    public List<Instituicao> listar(){
        return manager.listarInstituicaos();
    }
}

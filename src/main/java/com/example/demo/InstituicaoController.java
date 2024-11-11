package com.example.demo;

import java.util.Collections;
import java.util.Optional;
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

    // Método para criação de usuário
    @PostMapping("/usuarios")
    public ResponseEntity<String> createUsuario(@RequestBody Instituicao instituicao) {
        try {
            manager.adicionarInstituicao(instituicao);
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro: Usuário já cadastrado");
        }
    }

    // Método para listar todos os usuários
    @GetMapping("/users")
    public List<Instituicao> listar() {
        return manager.listarInstituicaos();
    }

    @PostMapping("/usuarios/login")
    public ResponseEntity<String> loginUsuario(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<Instituicao> usuario = manager.getUsuarioByEmailAndSenha(loginRequest.getEmail(), loginRequest.getSenha());
            if (usuario.isPresent()) {
                // Usuário encontrado, retorno com a mensagem de sucesso
                return ResponseEntity.ok("Login com sucesso!"); // Caso o usuário seja encontrado
            } else {
                // Caso não encontre o usuário
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login incorreto: usuário ou senha inválidos");
            }
        } catch (Exception ex) {
            // Em caso de erro interno do servidor
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro no servidor: " + ex.getMessage());
        }
    }

}

package com.example.demo;

import java.util.Collections;
import java.util.Optional;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
@RestController
@RequestMapping("/api")
public class InstituicaoController {

    private final InstituicaoManager manager;

    public InstituicaoController(InstituicaoManager manager) {
        this.manager = manager;
    }


    @PostMapping("/usuarios")
    public ResponseEntity<?> createUsuario(@RequestBody Instituicao instituicao) {
        try {
            manager.adicionarInstituicao(instituicao);
            String token = "fakeToken123"; 
            return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Erro: Usuário já cadastrado");
        }
    }

    @GetMapping("/users")
    public List<Instituicao> listar() {
        return manager.listarInstituicaos();
    }

    @PostMapping("/usuarios/login")
    public ResponseEntity<Map<String, String>> loginUsuario(@RequestBody LoginRequest loginRequest) {
        Optional<Instituicao> usuario = manager.getUsuarioByEmailAndSenha(loginRequest.getEmail(), loginRequest.getSenha());
        Map<String, String> response = new HashMap<>();
        if (usuario.isPresent()) {
            String token = "TOKEN_GENERADO_AQUI"; 
            response.put("message", "Login com sucesso!");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Usuário ou senha inválidos.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}

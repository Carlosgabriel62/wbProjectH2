package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import jakarta.annotation.PostConstruct;
import java.util.List;

@SpringBootApplication
public class DemoApplication {

    @Autowired
    private UsuarioManager usuarioManager;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @PostConstruct
    public void addInitialUser() {
        Usuario user = new Usuario(0, "Carlos", "bertunesgabriel6", "bertunes");
        usuarioManager.adicionarUsuario(user);
        System.out.println("Usuário adicionado: " + user.getNome());
        List<Usuario> usuarios = usuarioManager.listarUsuarios();
        usuarios.forEach(u -> System.out.println("Usuário na tabela: " + u.getNome() + ", Email: " + u.getEmail()));
    }
}

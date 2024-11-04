package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import jakarta.annotation.PostConstruct;
import java.util.List;

@SpringBootApplication
public class DemoApplication {

    @Autowired
    private InstituicaoManager usuarioManager;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @PostConstruct
    public void addInitialUser() {
        Instituicao user = new Instituicao(0, "Carlos", "bertunesgabriel6@gmail.com", "bertunes");
        usuarioManager.adicionarInstituicao(user);
        System.out.println("Usuário adicionado: " + user.getNome());
        List<Instituicao> usuarios = usuarioManager.listarInstituicaos();
        usuarios.forEach(u -> System.out.println("Usuário na tabela: " + u.getNome() + ", Email: " + u.getEmail()));
    }
}

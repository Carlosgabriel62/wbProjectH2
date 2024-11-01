package com.example.demo;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UsuarioController {
    private final UsuarioManager manager;

    public UsuarioController(UsuarioManager manager) {
        this.manager = manager;
    }

    @PostMapping("/usuarios")
    public Usuario createUsuario(@RequestBody Usuario usuario) {
        
        manager.adicionarUsuario(usuario);
        return usuario;
    }

    @GetMapping("/users")
    public List<Usuario> listar(){
        return manager.listarUsuarios();
    }
}

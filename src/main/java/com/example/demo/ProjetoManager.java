package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service


public class ProjetoManager {
    private final ProjetoRepository projetoRepository;

    public ProjetoManager(ProjetoRepository projetoRepository) {
        this.projetoRepository = projetoRepository;
    }

    public void adicionarProjeto(Projeto projeto) {
        System.out.println("Projeto adicionado: " + projeto);
        projetoRepository.save(projeto);
    }

    public List<Projeto> listarProjetos() {
        return projetoRepository.findAll();
    }

}
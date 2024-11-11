package com.example.demo;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class InstituicaoManager {
    private final InstituicaoRepository instituicaoRepository;

    public InstituicaoManager(InstituicaoRepository instituicaoRepository) {
        this.instituicaoRepository = instituicaoRepository;
    }

    public void adicionarInstituicao(Instituicao insituicao) {
        System.out.println("Adicionando usuário: " + insituicao);
        instituicaoRepository.save(insituicao);
    }
    

    public List<Instituicao> listarInstituicaos() {
        return instituicaoRepository.findAll();
    }

    public Optional<Instituicao> getUsuarioByEmailAndSenha(String email, String senha) {
        return instituicaoRepository.findByEmailAndSenha(email, senha); // Método que busca o usuário com o email e senha
    }
}

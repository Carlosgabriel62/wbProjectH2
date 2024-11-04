package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InstituicaoRepository extends JpaRepository<Instituicao, Integer> {
    Optional<Instituicao> findByEmailAndSenha(String email, String senha); // Ajuste no método de busca
    Optional<Instituicao> findByEmail(String email); // Ajuste no método de busca
}

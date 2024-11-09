package com.example.demo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "projetos")
@NoArgsConstructor
@AllArgsConstructor
public class Projeto{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private string projeto;
    private string descricao;
    private string cnpjcpf;


}
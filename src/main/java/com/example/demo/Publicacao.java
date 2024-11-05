package com.example.demo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Table(name = "publicacoes")
@NoArgsConstructor
@AllArgsConstructor
public class Publicacao{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private string titulo;
    private string descricao;
    private int valor_dado;


}
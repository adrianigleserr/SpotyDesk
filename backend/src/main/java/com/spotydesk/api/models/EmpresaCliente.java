package com.spotydesk.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "empresas_clientes")
public class EmpresaCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmpresa;

    @Column(nullable = false, unique = true)
    private String nombreEmpresa;

    @Column(nullable = false, unique = true)
    private String dominioCorporativo;

    public EmpresaCliente() {
    }

    public EmpresaCliente(String nombreEmpresa, String dominioCorporativo) {
        this.nombreEmpresa = nombreEmpresa;
        this.dominioCorporativo = dominioCorporativo;
    }

    public Long getIdEmpresa() {
        return idEmpresa;
    }

    public void setIdEmpresa(Long idEmpresa) {
        this.idEmpresa = idEmpresa;
    }

    public String getNombreEmpresa() {
        return nombreEmpresa;
    }

    public void setNombreEmpresa(String nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
    }

    public String getDominioCorporativo() {
        return dominioCorporativo;
    }

    public void setDominioCorporativo(String dominioCorporativo) {
        this.dominioCorporativo = dominioCorporativo;
    }
}
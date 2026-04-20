package com.spotydesk.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "sitios")
public class Sitio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSitio;

    @Column(nullable = false, length = 50)
    private String numeroSitio;

    @Column(length = 100)
    private String svgElementId; // Aquí guardaremos el ID del elemento <rect> o <path> del mapa SVG

    // Relación N:1 -> Muchos sitios pertenecen a una empresa
    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private EmpresaCliente empresa;

    public Sitio() {
    }

    public Long getIdSitio() {
        return idSitio;
    }

    public void setIdSitio(Long idSitio) {
        this.idSitio = idSitio;
    }

    public String getNumeroSitio() {
        return numeroSitio;
    }

    public void setNumeroSitio(String numeroSitio) {
        this.numeroSitio = numeroSitio;
    }

    public String getSvgElementId() {
        return svgElementId;
    }

    public void setSvgElementId(String svgElementId) {
        this.svgElementId = svgElementId;
    }

    public EmpresaCliente getEmpresa() {
        return empresa;
    }

    public void setEmpresa(EmpresaCliente empresa) {
        this.empresa = empresa;
    }

}
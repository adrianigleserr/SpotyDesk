package com.spotydesk.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "sitios")
public class Sitio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSitio;

    @Column(nullable = false, length = 50)
    private String numeroSitio; // Ej: "P-01", "Sala Alfa"

    @Column(length = 50)
    private String zona; // "Planta Principal", "Zona A"

    // --- CAMPOS PARA LA MATRIZ ---
    @Column(name = "posicion_matriz", nullable = false)
    private Integer posicionMatriz; // El número de celda (0 al 39 para una cuadrícula 8x5)

    @Column(length = 20, nullable = false)
    private String tipo; // "puesto", "sala", "pasillo"

    @Column(nullable = false)
    private Integer capacidad; // 1 para puestos, 4 u 8 para salas, 0 para pasillos
    // ----------------------------

    // Relación N:1 -> Muchos sitios pertenecen a una empresa
    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private EmpresaCliente empresa;

    public Sitio() {
    }

    // Getters y Setters...
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

    public String getZona() {
        return zona;
    }

    public void setZona(String zona) {
        this.zona = zona;
    }

    public Integer getPosicionMatriz() {
        return posicionMatriz;
    }

    public void setPosicionMatriz(Integer posicionMatriz) {
        this.posicionMatriz = posicionMatriz;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public EmpresaCliente getEmpresa() {
        return empresa;
    }

    public void setEmpresa(EmpresaCliente empresa) {
        this.empresa = empresa;
    }
}
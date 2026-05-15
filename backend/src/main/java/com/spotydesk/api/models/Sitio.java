package com.spotydesk.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "sitios")
public class Sitio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSitio;

    @Column(nullable = false, length = 50)
    private String numeroSitio; // Ej: "P1", "P2"

    @Column(length = 50)
    private String zona;

    // --- NUEVOS CAMPOS PARA LA MATRIZ ---
    @Column(nullable = false)
    private Integer capacidad; // 1 para puestos, 4-8 para salas, 0 para pasillos
    @Column(name = "posicion_matriz")
    private Integer posicionMatriz; // El número de celda en la cuadrícula (1 al 40)

    @Column(length = 20)
    private String tipo; // "puesto" (botón verde/gris) o "pasillo" (hueco en blanco)

    // Nota: El 'estado' (libre/ocupado) no se guarda en el sitio,
    // dependerá de si tiene una Reserva asociada para el día de hoy.

    // ------------------------------------

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

    public EmpresaCliente getEmpresa() {
        return empresa;
    }

    public void setEmpresa(EmpresaCliente empresa) {
        this.empresa = empresa;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }
}
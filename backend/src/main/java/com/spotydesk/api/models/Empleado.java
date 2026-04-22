package com.spotydesk.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "empleados")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmpleado;

    @Column(unique = true)
    private String dni;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String apellido1;

    @Column(length = 100)
    private String apellido2;

    @Column(length = 20)
    private String telefono;

    @Column(nullable = false, unique = true, length = 150)
    private String correo;

    @Column(length = 100)
    private String puestoTrabajo;

    @Column(nullable = false)
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    private Integer anioIncorporacion;

    // Relación N:1 -> Muchos empleados pertenecen a una empresa
    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private EmpresaCliente empresa;

    public Long getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(Long idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido1() {
        return apellido1;
    }

    public void setApellido1(String apellido1) {
        this.apellido1 = apellido1;
    }

    public String getApellido2() {
        return apellido2;
    }

    public void setApellido2(String apellido2) {
        this.apellido2 = apellido2;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getPuestoTrabajo() {
        return puestoTrabajo;
    }

    public void setPuestoTrabajo(String puestoTrabajo) {
        this.puestoTrabajo = puestoTrabajo;
    }

    public Integer getAnioIncorporacion() {
        return anioIncorporacion;
    }

    public void setAnioIncorporacion(Integer anioIncorporacion) {
        this.anioIncorporacion = anioIncorporacion;
    }

    public EmpresaCliente getEmpresa() {
        return empresa;
    }

    public void setEmpresa(EmpresaCliente empresa) {
        this.empresa = empresa;
    }

    public Empleado getJefe() {
        return jefe;
    }

    public void setJefe(Empleado jefe) {
        this.jefe = jefe;
    }

    public Sitio getSitioFavorito() {
        return sitioFavorito;
    }

    public void setSitioFavorito(Sitio sitioFavorito) {
        this.sitioFavorito = sitioFavorito;
    }

    // Relación N:1 (Recursiva) -> Muchos empleados pueden tener el mismo jefe
    @ManyToOne
    @JoinColumn(name = "id_empleado_jefe")
    private Empleado jefe;

    // Relación N:1 -> Varios empleados podrían tener el mismo sitio como favorito
    @ManyToOne
    @JoinColumn(name = "id_sitio_favorito")
    private Sitio sitioFavorito;

    public Empleado() {
    }

}
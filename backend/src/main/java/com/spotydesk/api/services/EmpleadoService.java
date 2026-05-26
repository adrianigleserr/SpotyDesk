package com.spotydesk.api.services;

import com.spotydesk.api.models.Empleado;
import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // --- NUEVO: Lógica inteligente de creación ---
    public Empleado crearEmpleado(Empleado empleado) {
        // Contamos cuántos empleados tiene ya esta empresa en la base de datos
        long numEmpleados = repository.countByEmpresa(empleado.getEmpresa());

        if (numEmpleados == 0) {
            // Es el primero de la empresa: Jefe absoluto y entra directo
            empleado.setPuestoTrabajo("Administrador");
            empleado.setEstado("ACTIVO");
        } else {
            // Ya hay gente: Empleado normal y a la sala de espera
            empleado.setPuestoTrabajo("Empleado");
            empleado.setEstado("PENDIENTE");
        }

        return repository.save(empleado);
    }
    // ---------------------------------------------

    public List<Empleado> listarEmpleados() {
        return repository.findAll();
    }

    public Empleado autenticar(String correo, String passwordPlana) {
        Empleado empleado = repository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("El correo no está registrado"));

        // Usamos .matches() para comparar la contraseña tecleada con el código
        // encriptado de la BD
        if (!passwordEncoder.matches(passwordPlana, empleado.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        // --- NUEVA SEGURIDAD: Validamos el estado del empleado ---
        if ("PENDIENTE".equals(empleado.getEstado())) {
            throw new RuntimeException("Tu cuenta está pendiente de aprobación por el administrador de la empresa.");
        }

        if ("RECHAZADO".equals(empleado.getEstado())) {
            throw new RuntimeException("Tu solicitud para unirte a la empresa ha sido rechazada.");
        }
        // ---------------------------------------------------------

        return empleado; // Si es ACTIVO y la clave es correcta, ¡pa' dentro!
    }

    public List<Empleado> obtenerEmpleadosPorEmpresa(Long idEmpresa) {
        return repository.findByEmpresaIdEmpresa(idEmpresa);
    }

    // --- NUEVO: Para el Buzón de Notificaciones ---

    // 1. Obtener solo los empleados que están esperando a ser aceptados
    public List<Empleado> obtenerPendientesPorEmpresa(Long idEmpresa) {
        List<Empleado> todos = repository.findByEmpresaIdEmpresa(idEmpresa);
        // Filtramos y devolvemos solo los que tienen estado "PENDIENTE"
        return todos.stream()
                .filter(e -> "PENDIENTE".equals(e.getEstado()))
                .toList();
    }

    // 2. Cambiar el estado (Aceptar o Rechazar)
    public Empleado actualizarEstado(Long idEmpleado, String nuevoEstado) {
        Empleado empleado = repository.findById(idEmpleado)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        empleado.setEstado(nuevoEstado);
        return repository.save(empleado);
    }
}
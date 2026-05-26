package com.spotydesk.api.controllers;

import com.spotydesk.api.models.Empleado;
import com.spotydesk.api.services.EmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empleados")
@CrossOrigin(origins = "http://localhost:4200")
public class EmpleadoController {

    @Autowired
    private EmpleadoService service;

    @GetMapping
    public List<Empleado> obtenerTodos() {
        return service.listarEmpleados();
    }

    @PostMapping
    public Empleado registrarEmpleado(@RequestBody Empleado empleado) {
        return service.crearEmpleado(empleado);
    }

    @GetMapping("/empresa/{idEmpresa}")
    public List<Empleado> obtenerPorEmpresa(@PathVariable Long idEmpresa) {
        return service.obtenerEmpleadosPorEmpresa(idEmpresa);
    }
    // --- NUEVOS ENDPOINTS PARA EL BUZÓN ---

    // El frontend llamará a esto para ver si hay notificaciones
    @GetMapping("/empresa/{idEmpresa}/pendientes")
    public List<Empleado> obtenerPendientes(@PathVariable Long idEmpresa) {
        return service.obtenerPendientesPorEmpresa(idEmpresa);
    }

    // El frontend llamará a esto cuando el jefe le dé a "Aceptar" o "Rechazar"
    @PutMapping("/{idEmpleado}/estado/{nuevoEstado}")
    public Empleado cambiarEstado(@PathVariable Long idEmpleado, @PathVariable String nuevoEstado) {
        return service.actualizarEstado(idEmpleado, nuevoEstado);
    }
}
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
}
package com.spotydesk.api.controllers;

import com.spotydesk.api.dtos.LoginRequest;
import com.spotydesk.api.dtos.RegistroRequest;
import com.spotydesk.api.models.Empleado;
import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.services.EmpleadoService;
import com.spotydesk.api.services.EmpresaClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private EmpresaClienteService empresaService;
    @Autowired
    private EmpleadoService empleadoService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/registro")
    public Empleado registrarNuevaCuenta(@RequestBody RegistroRequest request) {

        String dominio = request.getCorreo().substring(request.getCorreo().indexOf("@") + 1);

        EmpresaCliente nuevaEmpresa = new EmpresaCliente();
        nuevaEmpresa.setNombreEmpresa(request.getNombreEmpresa());
        nuevaEmpresa.setDominioCorporativo(dominio);
        nuevaEmpresa = empresaService.crearEmpresa(nuevaEmpresa);

        Empleado nuevoEmpleado = new Empleado();
        nuevoEmpleado.setNombre(request.getNombre());

        String[] partesApellidos = request.getApellidos().split(" ", 2);
        nuevoEmpleado.setApellido1(partesApellidos[0]);
        if (partesApellidos.length > 1)
            nuevoEmpleado.setApellido2(partesApellidos[1]);

        nuevoEmpleado.setCorreo(request.getCorreo());
        nuevoEmpleado.setEmpresa(nuevaEmpresa);
        nuevoEmpleado.setPuestoTrabajo("Administrador");

        String hashPassword = passwordEncoder.encode(request.getPassword());
        nuevoEmpleado.setPassword(hashPassword);

        return empleadoService.crearEmpleado(nuevoEmpleado);
    }

    @PostMapping("/login")
    public Map<String, Object> iniciarSesion(@RequestBody LoginRequest request) {
        Empleado empleado = empleadoService.autenticar(request.getCorreo(), request.getPassword());

        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("idEmpleado", empleado.getIdEmpleado());
        respuesta.put("nombre", empleado.getNombre());
        respuesta.put("correo", empleado.getCorreo());
        respuesta.put("rol", empleado.getPuestoTrabajo());
        respuesta.put("idEmpresa", empleado.getEmpresa().getIdEmpresa());
        respuesta.put("nombreEmpresa", empleado.getEmpresa().getNombreEmpresa());

        return respuesta;
    }
}
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

        // Extraemos el dominio (ej: gmail.com)
        String dominio = request.getCorreo().substring(request.getCorreo().indexOf("@") + 1);

        // --- LÓGICA INTELIGENTE PARA LA EMPRESA Y EL ROL ---
        EmpresaCliente empresaFinal;
        String puestoAsignado; // Variable temporal para guardar el puesto de forma inteligente

        // Intentamos buscar si ya existe una empresa con ese dominio
        var empresaExistente = empresaService.buscarPorDominio(dominio);

        if (empresaExistente.isPresent()) {
            // Si existe, la asignamos directamente
            empresaFinal = empresaExistente.get();
            puestoAsignado = "Empleado"; // 👈 Si la empresa ya existe, es un empleado normal
        } else {
            // Si no existe, creamos la nueva empresa
            EmpresaCliente nuevaEmpresa = new EmpresaCliente();
            nuevaEmpresa.setNombreEmpresa(request.getNombreEmpresa());
            nuevaEmpresa.setDominioCorporativo(dominio);
            empresaFinal = empresaService.crearEmpresa(nuevaEmpresa);
            puestoAsignado = "Administrador"; // 👈 Si crea la empresa, es el Administrador jefe
        }
        // --------------------------------------------------

        Empleado nuevoEmpleado = new Empleado();
        nuevoEmpleado.setNombre(request.getNombre());

        String[] partesApellidos = request.getApellidos().split(" ", 2);
        nuevoEmpleado.setApellido1(partesApellidos[0]);
        if (partesApellidos.length > 1) {
            nuevoEmpleado.setApellido2(partesApellidos[1]);
        }

        nuevoEmpleado.setCorreo(request.getCorreo());

        // Vinculamos al empleado con la empresa (sea la nueva o la encontrada)
        nuevoEmpleado.setEmpresa(empresaFinal);

        // 👈 ASIGNACIÓN DINÁMICA: Ya no está harcodeado como "Administrador"
        nuevoEmpleado.setPuestoTrabajo(puestoAsignado);

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
        respuesta.put("rol", empleado.getPuestoTrabajo()); // Devuelve "Administrador" o "Empleado"
        respuesta.put("idEmpresa", empleado.getEmpresa().getIdEmpresa());
        respuesta.put("nombreEmpresa", empleado.getEmpresa().getNombreEmpresa());

        return respuesta;
    }
}
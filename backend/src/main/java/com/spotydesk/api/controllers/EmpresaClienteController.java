package com.spotydesk.api.controllers;

import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.services.EmpresaClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // Indica que esta clase responderá peticiones web devolviendo datos (JSON)
@RequestMapping("/api/empresas") // Todos los endpoints de este archivo empezarán por esta ruta
public class EmpresaClienteController {

    @Autowired
    private EmpresaClienteService service;

    // Cuando hagamos un GET a http://localhost:8080/api/empresas
    @GetMapping
    public List<EmpresaCliente> obtenerTodas() {
        return service.listarEmpresas();
    }

    // Cuando hagamos un POST a http://localhost:8080/api/empresas enviando un JSON
    @PostMapping
    public EmpresaCliente registrarEmpresa(@RequestBody EmpresaCliente empresa) {
        return service.crearEmpresa(empresa);
    }
}
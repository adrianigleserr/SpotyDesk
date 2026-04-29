package com.spotydesk.api.controllers;

import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.services.EmpresaClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "http://localhost:4200") // Permiso para Angular
public class EmpresaController {

    @Autowired
    private EmpresaClienteService empresaService;

    // Cuando Angular pida /api/empresas/1, este método buscará la empresa 1
    @GetMapping("/{id}")
    public EmpresaCliente obtenerEmpresaPorId(@PathVariable Long id) {
        Optional<EmpresaCliente> empresa = empresaService.buscarPorId(id);

        if (empresa.isPresent()) {
            return empresa.get();
        } else {
            throw new RuntimeException("Empresa no encontrada");
        }
    }
}
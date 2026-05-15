package com.spotydesk.api.controllers;

import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.services.EmpresaClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "http://localhost:4200") // Permiso para Angular
public class EmpresaController {

    @Autowired
    private EmpresaClienteService empresaService;

    // Método para obtener TODAS las empresas (Para el desplegable del
    // registro)
    @GetMapping
    public List<EmpresaCliente> obtenerTodas() {
        return empresaService.obtenerTodas();
    }

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

    @PostMapping
    public EmpresaCliente registrarEmpresa(@RequestBody EmpresaCliente empresa) {
        return empresaService.guardar(empresa);
    }
}
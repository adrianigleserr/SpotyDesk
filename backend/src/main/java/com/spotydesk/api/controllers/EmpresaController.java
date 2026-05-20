package com.spotydesk.api.controllers;

import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.services.EmpresaClienteService;
import com.spotydesk.api.services.PlanoOficinaService; // <-- 1. Importamos el servicio del plano
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

    @Autowired
    private PlanoOficinaService planoOficinaService; // <-- 2. Inyectamos el servicio

    // Método para obtener TODAS las empresas
    @GetMapping
    public List<EmpresaCliente> obtenerTodas() {
        return empresaService.obtenerTodas();
    }

    // Método para buscar una empresa concreta
    @GetMapping("/{id}")
    public EmpresaCliente obtenerEmpresaPorId(@PathVariable Long id) {
        Optional<EmpresaCliente> empresa = empresaService.buscarPorId(id);

        if (empresa.isPresent()) {
            return empresa.get();
        } else {
            throw new RuntimeException("Empresa no encontrada");
        }
    }

    // Método que registra la empresa y crea el plano
    @PostMapping
    public EmpresaCliente registrarEmpresa(@RequestBody EmpresaCliente empresa) {
        // A. Guardamos la empresa
        EmpresaCliente empresaGuardada = empresaService.guardar(empresa);

        // B. ¡MAGIA! Generamos el plano aleatorio para esta empresa
        planoOficinaService.generarPlanoParaEmpresa(empresaGuardada);

        // C. Devolvemos la empresa
        return empresaGuardada;
    }
}
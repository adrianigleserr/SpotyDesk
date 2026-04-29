package com.spotydesk.api.controllers;

import com.spotydesk.api.models.Sitio;
import com.spotydesk.api.services.SitioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sitios")
@CrossOrigin(origins = "http://localhost:4200")
public class SitioController {

    @Autowired
    private SitioService service;

    @GetMapping
    public List<Sitio> obtenerTodos() {
        return service.listarSitios();
    }

    @PostMapping
    public Sitio registrarSitio(@RequestBody Sitio sitio) {
        return service.crearSitio(sitio);
    }

    @GetMapping("/empresa/{idEmpresa}")
    public List<Sitio> obtenerPorEmpresa(@PathVariable Long idEmpresa) {
        return service.obtenerSitiosPorEmpresa(idEmpresa);
    }
}
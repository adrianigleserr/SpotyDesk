package com.spotydesk.api.controllers;

import com.spotydesk.api.models.Sala;
import com.spotydesk.api.services.SalaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/salas")
@CrossOrigin(origins = "http://localhost:4200")
public class SalaController {

    @Autowired
    private SalaService service;

    @GetMapping
    public List<Sala> obtenerTodas() {
        return service.listarSalas();
    }

    @PostMapping
    public Sala registrarSala(@RequestBody Sala sala) {
        return service.crearSala(sala);
    }
}
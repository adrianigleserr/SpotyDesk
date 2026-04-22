package com.spotydesk.api.controllers;

import com.spotydesk.api.models.Reserva;
import com.spotydesk.api.services.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservaController {

    @Autowired
    private ReservaService service;

    @GetMapping
    public List<Reserva> obtenerTodas() {
        return service.listarReservas();
    }

    @PostMapping
    public Reserva registrarReserva(@RequestBody Reserva reserva) {
        return service.crearReserva(reserva);
    }
}
package com.spotydesk.api.services;

import com.spotydesk.api.models.Reserva;
import com.spotydesk.api.repositories.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository repository;

    public List<Reserva> listarReservas() {
        return repository.findAll();
    }

    public Reserva crearReserva(Reserva reserva) {

        // 1. Validar si está reservando un Sitio
        if (reserva.getSitio() != null) {
            boolean ocupado = repository.isSitioOcupado(
                    reserva.getSitio().getIdSitio(),
                    reserva.getFechaInicio(),
                    reserva.getFechaFin());
            if (ocupado) {
                // Detiene la ejecución y lanza un error
                throw new RuntimeException("El sitio ya está reservado en ese horario.");
            }
        }

        // 2. Validar si está reservando una Sala
        if (reserva.getSala() != null) {
            boolean ocupada = repository.isSalaOcupada(
                    reserva.getSala().getIdSala(),
                    reserva.getFechaInicio(),
                    reserva.getFechaFin());
            if (ocupada) {
                // Detiene la ejecución y lanza un error
                throw new RuntimeException("La sala ya está reservada en ese horario.");
            }
        }

        // 3. Si pasa todas las validaciones, se guarda en la BBDD
        return repository.save(reserva);
    }
}
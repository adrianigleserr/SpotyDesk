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
        return repository.save(reserva);
    }
}
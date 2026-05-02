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

        // 1. VALIDAR: ¿El empleado ya tiene una reserva en ese horario?
        if (reserva.getEmpleado() != null) {
            boolean empleadoOcupado = repository.isEmpleadoOcupado(
                    reserva.getEmpleado().getIdEmpleado(),
                    reserva.getFechaInicio(),
                    reserva.getFechaFin());
            if (empleadoOcupado) {
                throw new RuntimeException("ERROR_DOBLE_RESERVA"); // Lanzamos un error muy claro
            }
        }

        // 2. VALIDAR: ¿El sitio ya está ocupado por otra persona en ese horario?
        if (reserva.getSitio() != null) {
            boolean sitioOcupado = repository.isSitioOcupado(
                    reserva.getSitio().getIdSitio(),
                    reserva.getFechaInicio(),
                    reserva.getFechaFin());
            if (sitioOcupado) {
                throw new RuntimeException("El sitio ya está reservado en ese horario.");
            }
        }

        // 3. VALIDAR: ¿La sala ya está ocupada?
        if (reserva.getSala() != null) {
            boolean salaOcupada = repository.isSalaOcupada(
                    reserva.getSala().getIdSala(),
                    reserva.getFechaInicio(),
                    reserva.getFechaFin());
            if (salaOcupada) {
                throw new RuntimeException("La sala ya está reservada en ese horario.");
            }
        }

        return repository.save(reserva);
    }

    public List<Reserva> obtenerPorEmpresa(Long idEmpresa) {
        return repository.findByEmpresaId(idEmpresa);
    }

    public List<Reserva> obtenerPorEmpleado(Long idEmpleado) {
        return repository.findByEmpleadoId(idEmpleado);
    }

    public Reserva cancelarReserva(Long idReserva) {
        Reserva reserva = repository.findById(idReserva)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        reserva.setEstado("Cancelada");
        return repository.save(reserva);
    }
}
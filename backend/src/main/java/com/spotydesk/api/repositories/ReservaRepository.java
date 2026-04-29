package com.spotydesk.api.repositories;

import com.spotydesk.api.models.Reserva;
import com.spotydesk.api.models.Sitio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

        // Comprueba si existe alguna reserva activa para ese SITIO que se cruce con
        // nuestro horario
        @Query("SELECT COUNT(r) > 0 FROM Reserva r WHERE r.sitio.idSitio = :idSitio " +
                        "AND r.estado = 'Activa' " +
                        "AND (r.fechaInicio < :fechaFin AND r.fechaFin > :fechaInicio)")
        boolean isSitioOcupado(@Param("idSitio") Long idSitio,
                        @Param("fechaInicio") LocalDateTime fechaInicio,
                        @Param("fechaFin") LocalDateTime fechaFin);

        // Comprueba si existe alguna reserva activa para esa SALA que se cruce con
        // nuestro horario
        @Query("SELECT COUNT(r) > 0 FROM Reserva r WHERE r.sala.idSala = :idSala " +
                        "AND r.estado = 'Activa' " +
                        "AND (r.fechaInicio < :fechaFin AND r.fechaFin > :fechaInicio)")
        boolean isSalaOcupada(@Param("idSala") Long idSala,
                        @Param("fechaInicio") LocalDateTime fechaInicio,
                        @Param("fechaFin") LocalDateTime fechaFin);

        // Devuelve el sitio donde está sentado un empleado en una fecha concreta
        @Query("SELECT r.sitio FROM Reserva r WHERE r.empleado.idEmpleado = :idEmpleado " +
                        "AND r.estado = 'Activa' " +
                        "AND (r.fechaInicio < :fechaFin AND r.fechaFin > :fechaInicio)")
        Sitio findSitioReservadoPorEmpleado(@Param("idEmpleado") Long idEmpleado,
                        @Param("fechaInicio") LocalDateTime fechaInicio,
                        @Param("fechaFin") LocalDateTime fechaFin);
}
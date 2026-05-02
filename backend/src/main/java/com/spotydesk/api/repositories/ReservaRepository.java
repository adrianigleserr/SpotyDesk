package com.spotydesk.api.repositories;

import com.spotydesk.api.models.Reserva;
import com.spotydesk.api.models.Sitio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

        // Traer todas las reservas de una empresa
        @Query("SELECT r FROM Reserva r WHERE r.sitio.empresa.idEmpresa = :idEmpresa AND r.estado = 'Activa'")
        List<Reserva> findByEmpresaId(@Param("idEmpresa") Long idEmpresa);

        // Comprueba si el SITIO está ocupado
        @Query("SELECT COUNT(r) > 0 FROM Reserva r WHERE r.sitio.idSitio = :idSitio " +
                        "AND r.estado = 'Activa' " +
                        "AND (r.fechaInicio < :fechaFin AND r.fechaFin > :fechaInicio)")
        boolean isSitioOcupado(@Param("idSitio") Long idSitio,
                        @Param("fechaInicio") LocalDateTime fechaInicio,
                        @Param("fechaFin") LocalDateTime fechaFin);

        // Comprueba si la SALA está ocupada
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

        // --- LAS 2 NUEVAS CONSULTAS QUE SOLUCIONAN TU ERROR ---

        // 1. Comprueba si el EMPLEADO ya tiene una reserva en ese horario (Para
        // bloquear el doble clic)
        @Query("SELECT COUNT(r) > 0 FROM Reserva r WHERE r.empleado.idEmpleado = :idEmpleado " +
                        "AND r.estado = 'Activa' " +
                        "AND (r.fechaInicio < :fechaFin AND r.fechaFin > :fechaInicio)")
        boolean isEmpleadoOcupado(@Param("idEmpleado") Long idEmpleado,
                        @Param("fechaInicio") LocalDateTime fechaInicio,
                        @Param("fechaFin") LocalDateTime fechaFin);

        // 2. Busca todas las reservas de un empleado (Para tu nueva pantalla de Mis
        // Reservas)
        @Query("SELECT r FROM Reserva r WHERE r.empleado.idEmpleado = :idEmpleado ORDER BY r.fechaInicio DESC")
        List<Reserva> findByEmpleadoId(@Param("idEmpleado") Long idEmpleado);
}
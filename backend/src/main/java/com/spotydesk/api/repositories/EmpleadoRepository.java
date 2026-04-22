package com.spotydesk.api.repositories;

import com.spotydesk.api.models.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    boolean existsByCorreo(String correo);

    // Busca todos los empleados que tienen el mismo jefe
    List<Empleado> findByJefeIdEmpleado(Long idJefe);
}
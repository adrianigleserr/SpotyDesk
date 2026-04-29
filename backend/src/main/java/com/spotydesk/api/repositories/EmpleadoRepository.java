package com.spotydesk.api.repositories;

import com.spotydesk.api.models.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    Optional<Empleado> findByCorreo(String correo);

    boolean existsByCorreo(String correo);

    List<Empleado> findByJefeIdEmpleado(Long idJefe);

    List<Empleado> findByEmpresaIdEmpresa(Long idEmpresa);
}
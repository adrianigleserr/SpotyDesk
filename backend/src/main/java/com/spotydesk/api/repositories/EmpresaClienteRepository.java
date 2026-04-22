package com.spotydesk.api.repositories;

import com.spotydesk.api.models.EmpresaCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmpresaClienteRepository extends JpaRepository<EmpresaCliente, Long> {

    Optional<EmpresaCliente> findByDominioCorporativo(String dominioCorporativo);

    boolean existsByDominioCorporativo(String dominioCorporativo);

}

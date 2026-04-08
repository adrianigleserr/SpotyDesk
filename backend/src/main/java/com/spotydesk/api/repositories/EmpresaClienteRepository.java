package com.spotydesk.api.repositories;

import com.spotydesk.api.models.EmpresaCliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaClienteRepository extends JpaRepository<EmpresaCliente, Long> {
    boolean existsByDominioCorporativo(String dominioCorporativo);
}
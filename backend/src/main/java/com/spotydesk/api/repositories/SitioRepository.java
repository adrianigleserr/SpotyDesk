package com.spotydesk.api.repositories;

import com.spotydesk.api.models.Sitio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SitioRepository extends JpaRepository<Sitio, Long> {
    // Busca todos los sitios de una empresa en una zona concreta
    List<Sitio> findByEmpresaIdEmpresaAndZona(Long idEmpresa, String zona);

    // Busca todos los sitios de una empresa
    List<Sitio> findByEmpresaIdEmpresa(Long idEmpresa);
}
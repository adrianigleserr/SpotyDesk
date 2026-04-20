package com.spotydesk.api.repositories;

import com.spotydesk.api.models.Sitio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SitioRepository extends JpaRepository<Sitio, Long> {
}
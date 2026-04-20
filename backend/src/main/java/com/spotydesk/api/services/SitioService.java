package com.spotydesk.api.services;

import com.spotydesk.api.models.Sitio;
import com.spotydesk.api.repositories.SitioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SitioService {
    @Autowired
    private SitioRepository repository;

    public List<Sitio> listarSitios() {
        return repository.findAll();
    }

    public Sitio crearSitio(Sitio sitio) {
        return repository.save(sitio);
    }
}
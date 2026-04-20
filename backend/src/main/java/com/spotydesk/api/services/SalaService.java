package com.spotydesk.api.services;

import com.spotydesk.api.models.Sala;
import com.spotydesk.api.repositories.SalaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SalaService {
    @Autowired
    private SalaRepository repository;

    public List<Sala> listarSalas() {
        return repository.findAll();
    }

    public Sala crearSala(Sala sala) {
        return repository.save(sala);
    }
}
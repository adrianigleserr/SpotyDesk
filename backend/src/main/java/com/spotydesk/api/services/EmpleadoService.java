package com.spotydesk.api.services;

import com.spotydesk.api.models.Empleado;
import com.spotydesk.api.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmpleadoService {
    @Autowired
    private EmpleadoRepository repository;

    public List<Empleado> listarEmpleados() {
        return repository.findAll();
    }

    public Empleado crearEmpleado(Empleado empleado) {
        return repository.save(empleado);
    }
}
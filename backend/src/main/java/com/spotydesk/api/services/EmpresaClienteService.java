package com.spotydesk.api.services;

import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.repositories.EmpresaClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service // Le dice a Spring que esta clase contiene la lógica de negocio
public class EmpresaClienteService {

    @Autowired // Inyecta el repositorio automáticamente para que podamos usarlo
    private EmpresaClienteRepository repository;

    // Método para guardar una nueva empresa
    public EmpresaCliente crearEmpresa(EmpresaCliente empresa) {
        // Aquí en el futuro puedes poner validaciones (ej. comprobar si el dominio ya
        // existe)
        return repository.save(empresa);
    }

    public Optional<EmpresaCliente> buscarPorDominio(String dominio) {
        return repository.findByDominioCorporativo(dominio);
    }

    // Método para obtener todas las empresas
    public List<EmpresaCliente> listarEmpresas() {
        return repository.findAll();
    }
}
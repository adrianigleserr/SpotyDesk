package com.spotydesk.api.services;

import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.repositories.EmpresaClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaClienteService {

    @Autowired
    private EmpresaClienteRepository repository;

    // --- MÉTODOS PARA BUSCAR ---

    public Optional<EmpresaCliente> buscarPorId(Long id) {
        return repository.findById(id);
    }

    // El método que pedía tu AuthController
    public Optional<EmpresaCliente> buscarPorDominio(String dominio) {
        return repository.findByDominioCorporativo(dominio);
    }

    // --- MÉTODOS PARA LISTAR ---

    public List<EmpresaCliente> obtenerTodas() {
        return repository.findAll();
    }

    // El método que pedía tu EmpresaClienteController (hace lo mismo que el de
    // arriba)
    public List<EmpresaCliente> listarEmpresas() {
        return repository.findAll();
    }

    // --- MÉTODOS PARA GUARDAR ---

    public EmpresaCliente guardar(EmpresaCliente empresa) {
        return repository.save(empresa);
    }

    // El método que pedían ambos controladores (hace lo mismo que el de arriba)
    public EmpresaCliente crearEmpresa(EmpresaCliente empresa) {
        return repository.save(empresa);
    }
}
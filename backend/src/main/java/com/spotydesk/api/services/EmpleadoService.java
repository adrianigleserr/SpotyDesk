package com.spotydesk.api.services;

import com.spotydesk.api.models.Empleado;
import com.spotydesk.api.repositories.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Empleado> listarEmpleados() {
        return repository.findAll();
    }

    public Empleado crearEmpleado(Empleado empleado) {
        return repository.save(empleado);
    }

    public Empleado autenticar(String correo, String passwordPlana) {
        Empleado empleado = repository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("El correo no está registrado"));

        // Usamos .matches() para comparar la contraseña tecleada con el código
        // encriptado de la BD
        if (!passwordEncoder.matches(passwordPlana, empleado.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return empleado; // Esto vuelve a estar en su sitio correcto
    }

    public List<Empleado> obtenerEmpleadosPorEmpresa(Long idEmpresa) {
        return repository.findByEmpresaIdEmpresa(idEmpresa);
    }
}
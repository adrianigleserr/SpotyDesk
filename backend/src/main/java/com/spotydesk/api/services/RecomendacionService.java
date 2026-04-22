package com.spotydesk.api.services;

import com.spotydesk.api.models.Empleado;
import com.spotydesk.api.models.Sitio;
import com.spotydesk.api.repositories.EmpleadoRepository;
import com.spotydesk.api.repositories.ReservaRepository;
import com.spotydesk.api.repositories.SitioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecomendacionService {

    @Autowired
    private EmpleadoRepository empleadoRepository;
    @Autowired
    private ReservaRepository reservaRepository;
    @Autowired
    private SitioRepository sitioRepository;

    public Sitio sugerirSitio(Long idEmpleado, LocalDateTime fechaInicio, LocalDateTime fechaFin) {

        Empleado empleado = empleadoRepository.findById(idEmpleado)
                .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));
        Long idEmpresa = empleado.getEmpresa().getIdEmpresa();

        Sitio favorito = empleado.getSitioFavorito();
        if (favorito != null && !reservaRepository.isSitioOcupado(favorito.getIdSitio(), fechaInicio, fechaFin)) {
            return favorito;
        }

        if (empleado.getJefe() != null) {
            Sitio sitioJefe = reservaRepository.findSitioReservadoPorEmpleado(
                    empleado.getJefe().getIdEmpleado(), fechaInicio, fechaFin);

            if (sitioJefe != null && sitioJefe.getZona() != null) {
                Sitio sugerencia = buscarSitioLibreEnZona(idEmpresa, sitioJefe.getZona(), fechaInicio, fechaFin);
                if (sugerencia != null)
                    return sugerencia;
            }
        }

        if (empleado.getJefe() != null) {
            List<Empleado> companeros = empleadoRepository.findByJefeIdEmpleado(empleado.getJefe().getIdEmpleado());
            for (Empleado comp : companeros) {
                if (comp.getIdEmpleado().equals(idEmpleado))
                    continue; // Saltar a uno mismo

                Sitio sitioComp = reservaRepository.findSitioReservadoPorEmpleado(comp.getIdEmpleado(), fechaInicio,
                        fechaFin);
                if (sitioComp != null && sitioComp.getZona() != null) {
                    Sitio sugerencia = buscarSitioLibreEnZona(idEmpresa, sitioComp.getZona(), fechaInicio, fechaFin);
                    if (sugerencia != null)
                        return sugerencia;
                }
            }
        }

        return buscarCualquierSitioLibre(idEmpresa, fechaInicio, fechaFin);
    }

    // --- MÉTODOS AUXILIARES ---

    private Sitio buscarSitioLibreEnZona(Long idEmpresa, String zona, LocalDateTime inicio, LocalDateTime fin) {
        List<Sitio> sitiosEnZona = sitioRepository.findByEmpresaIdEmpresaAndZona(idEmpresa, zona);
        for (Sitio sitio : sitiosEnZona) {
            if (!reservaRepository.isSitioOcupado(sitio.getIdSitio(), inicio, fin)) {
                return sitio; // Devuelve el primer sitio libre en esa zona
            }
        }
        return null; // La zona está llena
    }

    private Sitio buscarCualquierSitioLibre(Long idEmpresa, LocalDateTime inicio, LocalDateTime fin) {
        List<Sitio> todosLosSitios = sitioRepository.findByEmpresaIdEmpresa(idEmpresa);
        for (Sitio sitio : todosLosSitios) {
            if (!reservaRepository.isSitioOcupado(sitio.getIdSitio(), inicio, fin)) {
                return sitio;
            }
        }
        throw new RuntimeException("No hay sitios libres en la oficina para esa fecha.");
    }
}
package com.spotydesk.api;

import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.models.Sitio;
import com.spotydesk.api.repositories.EmpresaClienteRepository;
import com.spotydesk.api.repositories.SitioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	/**
	 * Este bloque "siembra" (seed) la base de datos con los sitios iniciales
	 * si la tabla está vacía y la empresa existe.
	 */
	@Bean
	public CommandLineRunner inicializarMapa(SitioRepository sitioRepository,
			EmpresaClienteRepository empresaRepository) {
		return args -> {
			System.out.println("\n--- 🏟️ COMPROBANDO CONFIGURACIÓN DEL MAPA ---");

			// 1. Buscamos la empresa 1 (donde están Diego y Alejo)
			Optional<EmpresaCliente> empresaOpt = empresaRepository.findById(1L);

			if (empresaOpt.isPresent()) {
				long totalSitios = sitioRepository.count();

				if (totalSitios == 0) {
					EmpresaCliente empresa = empresaOpt.get();
					System.out.println("🌱 No hay sitios. Sembrando 40 puestos para: " + empresa.getNombreEmpresa());

					for (int i = 1; i <= 40; i++) {
						Sitio sitio = new Sitio();
						sitio.setPosicionMatriz(i);
						sitio.setEmpresa(empresa);
						sitio.setZona("Planta Principal");

						// Lógica de pasillos (columnas 3 y 6 en una matriz de 8)
						// Usamos == para comparar en Java
						if (i % 8 == 3 || i % 8 == 6) {
							sitio.setNumeroSitio("Pasillo");
							sitio.setTipo("pasillo");
						} else {
							sitio.setNumeroSitio("P" + i);
							sitio.setTipo("puesto");
						}

						sitioRepository.save(sitio);
					}
					System.out.println("✅ ¡Mapa de 40 celdas creado con éxito!");
				} else {
					System.out.println("ℹ️ El mapa ya tiene " + totalSitios + " sitios creados. Saltando semilla.");
				}
			} else {
				System.out.println("⚠️ No se encontró la empresa con ID 1. Regístrate primero para sembrar el mapa.");
			}

			System.out.println("--- 🚀 SERVIDOR SPOTYDESK LISTO ---\n");
		};
	}
}
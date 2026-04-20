package com.spotydesk.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/* 
import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.models.Sala;
import com.spotydesk.api.services.EmpresaClienteService;
import com.spotydesk.api.services.SalaService;
import org.springframework.boot.CommandLineRunner;

import org.springframework.context.annotation.Bean;
*/
@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	// Este bloque se ejecuta automáticamente en cuanto arranca el servidor
	/*
	 * @Bean
	 * public CommandLineRunner probarBaseDeDatos(EmpresaClienteService
	 * empresaService, SalaService salaService) {
	 * return args -> {
	 * System.out.println("\n--- 🚀 INICIANDO PRUEBA DE BASE DE DATOS ---");
	 * 
	 * try {
	 * // 1. Crear y guardar una Empresa
	 * EmpresaCliente nuevaEmpresa = new EmpresaCliente();
	 * nuevaEmpresa.setNombreEmpresa("SpotyDesk HQ");
	 * nuevaEmpresa.setDominioCorporativo("spotydesk.com");
	 * 
	 * // El servicio usa el repositorio para hacer el INSERT en PostgreSQL
	 * nuevaEmpresa = empresaService.crearEmpresa(nuevaEmpresa);
	 * System.out.println("✅ Empresa creada con éxito: " +
	 * nuevaEmpresa.getNombreEmpresa() + " (ID: " + nuevaEmpresa.getIdEmpresa() +
	 * ")");
	 * 
	 * // 2. Crear y guardar una Sala (¡Vinculada a la empresa!)
	 * Sala nuevaSala = new Sala();
	 * nuevaSala.setNombre("Sala Matrix");
	 * nuevaSala.setCapacidad(10);
	 * nuevaSala.setEmpresa(nuevaEmpresa); // <-- AQUÍ SE HACE LA MAGIA DE LA CLAVE
	 * FORÁNEA
	 * 
	 * nuevaSala = salaService.crearSala(nuevaSala);
	 * System.out.println("✅ Sala creada con éxito: " + nuevaSala.getNombre() +
	 * " (Pertenece a la empresa ID: " + nuevaSala.getEmpresa().getIdEmpresa() +
	 * ")");
	 * 
	 * System.out.println("--- 🎉 PRUEBA FINALIZADA CON ÉXITO ---\n");
	 * 
	 * } catch (Exception e) {
	 * System.out.println("❌ ERROR DURANTE LA PRUEBA: " + e.getMessage());
	 * }
	 * };
	 * }
	 */
}
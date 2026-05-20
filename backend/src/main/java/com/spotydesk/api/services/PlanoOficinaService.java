package com.spotydesk.api.services;

import com.spotydesk.api.models.EmpresaCliente;
import com.spotydesk.api.models.Sitio;
import com.spotydesk.api.repositories.SitioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
public class PlanoOficinaService {

    @Autowired
    private SitioRepository sitioRepository;

    private final Random random = new Random();
    private static final int FILAS = 5;
    private static final int COLUMNAS = 8;
    private static final String ZONA_POR_DEFECTO = "Planta Principal";

    @Transactional
    public void generarPlanoParaEmpresa(EmpresaCliente empresa) {
        System.out.println("¡MAGIA! Generando plano aleatorio para la empresa: " + empresa.getNombreEmpresa());
        // Inicializamos una matriz de 5x8 vacía para diseñar el plano
        String[][] matrizPlano = new String[FILAS][COLUMNAS];
        // También una para guardar los IDs de los sitios grandes
        Long[][] matrizIdSitiosGrandes = new Long[FILAS][COLUMNAS];

        // --- 1. PASILLO CENTRAL (columna 3 o 4 base 0) ---
        int colPasillo = 3 + random.nextInt(2); // Aleatoriamente col 3 o 4
        for (int f = 0; f < FILAS; f++) {
            matrizPlano[f][colPasillo] = "pasillo";
            Sitio pasillo = crearYGuardarSitio(empresa, "Vacío", calcularPosicionMatriz(f, colPasillo), "pasillo", 0,
                    ZONA_POR_DEFECTO);
        }

        // --- 2. SALAS GRANDES EN ESQUINAS MÁS LEJANAS ---
        // Definimos las zonas izquierda y derecha respecto al pasillo
        int anchoMI = colPasillo;
        int anchoMD = COLUMNAS - 1 - colPasillo;

        // Aleatoriamente decidimos qué mitad tiene la sala 3x2 y cuál la 2x2
        boolean sala3x2ALaIzquierda = random.nextBoolean();

        if (sala3x2ALaIzquierda) {
            // Mitad Izquierda (MI): Sala 3x2
            colocarSalaAleatoriaEnMitad(matrizPlano, 0, anchoMI - 1, "3x2", 8, "Sala Alfa", empresa);
            // Mitad Derecha (MD): Sala 2x2
            colocarSalaAleatoriaEnMitad(matrizPlano, colPasillo + 1, COLUMNAS - 1, "2x2", 4, "Sala Beta", empresa);
        } else {
            // Mitad Izquierda (MI): Sala 2x2
            colocarSalaAleatoriaEnMitad(matrizPlano, 0, anchoMI - 1, "2x2", 4, "Sala Alfa", empresa);
            // Mitad Derecha (MD): Sala 3x2
            colocarSalaAleatoriaEnMitad(matrizPlano, colPasillo + 1, COLUMNAS - 1, "3x2", 8, "Sala Beta", empresa);
        }

        // --- 3. RELLENAR CON ASISTENTOS INDIVIDUALES (Puestos) ---
        int contadorPuestos = 1;
        for (int f = 0; f < FILAS; f++) {
            for (int c = 0; c < COLUMNAS; c++) {
                if (matrizPlano[f][c] == null) { // Si la celda está vacía
                    String nombrePuesto = String.format("P-%02d", contadorPuestos++);
                    matrizPlano[f][c] = "puesto";
                    Sitio puesto = crearYGuardarSitio(empresa, nombrePuesto, calcularPosicionMatriz(f, c), "puesto", 1,
                            ZONA_POR_DEFECTO);
                }
            }
        }
    }

    private void colocarSalaAleatoriaEnMitad(String[][] matrizPlano, int colMin, int colMax, String tipoSala,
            int capacidad, String nombreSala, EmpresaCliente empresa) {
        int anchoSala = 0;
        int altoSala = 0;
        if (tipoSala.equals("3x2")) {
            anchoSala = 3;
            altoSala = 2;
        }
        if (tipoSala.equals("2x2")) {
            anchoSala = 2;
            altoSala = 2;
        }

        // Aleatoriamente arriba o abajo de su mitad
        int fInicio = random.nextBoolean() ? 0 : FILAS - altoSala;

        // Generar columna de inicio aleatoria dentro de su mitad, asegurando que quepa
        int colLimite = colMax - anchoSala + 1;
        if (colLimite < colMin)
            colLimite = colMin; // Asegurarse de que el límite no sea menor que el inicio

        int cInicio = colMin + random.nextInt(Math.max(1, colLimite - colMin + 1));

        // Marcar celdas como 'sala' y guardar el sitio
        for (int f = fInicio; f < fInicio + altoSala; f++) {
            for (int c = cInicio; c < cInicio + anchoSala; c++) {
                matrizPlano[f][c] = "sala";
                // Guardamos el ID del primer bloque para el frontend si hace falta, por ahora
                // no.
            }
        }
        Sitio sala = crearYGuardarSitio(empresa, nombreSala, calcularPosicionMatriz(fInicio, cInicio), "sala",
                capacidad, ZONA_POR_DEFECTO);
    }

    private Sitio crearYGuardarSitio(EmpresaCliente empresa, String numeroSitio, Integer posicionMatriz, String tipo,
            Integer capacidad, String zona) {
        Sitio sitio = new Sitio();
        sitio.setEmpresa(empresa);
        sitio.setNumeroSitio(numeroSitio);
        sitio.setPosicionMatriz(posicionMatriz);
        sitio.setTipo(tipo);
        sitio.setCapacidad(capacidad);
        sitio.setZona(zona);
        return sitioRepository.save(sitio);
    }

    private int calcularPosicionMatriz(int fila, int columna) {
        return fila * COLUMNAS + columna;
    }
}
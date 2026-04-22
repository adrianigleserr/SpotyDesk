package com.spotydesk.api.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice // Indica que esta clase interceptará excepciones en toda la aplicación
public class ManejadorDeErrores {

    // Este método se activa cuando lanzamos un RuntimeException (como el de "sitio
    // ocupado")
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> manejarErrorDeNegocio(RuntimeException ex) {
        Map<String, String> respuesta = new HashMap<>();

        // Creamos un JSON con el mensaje de error personalizado
        respuesta.put("error", ex.getMessage());

        // Respondemos con un código 400 (Bad Request)
        return new ResponseEntity<>(respuesta, HttpStatus.BAD_REQUEST);
    }
}
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Para hacer peticiones al backend
import { FormsModule } from '@angular/forms'; // Para capturar lo que el usuario escribe
import { CommonModule } from '@angular/common'; // Para mostrar mensajes de error (ngIf)

@Component({
  selector: 'app-login',
  standalone: true,
  // ¡Importante añadir FormsModule y CommonModule aquí!
  imports: [RouterLink, FormsModule, CommonModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router);
  private http = inject(HttpClient); // Inyectamos el "cartero" de Angular

  // Variables que se conectarán con los inputs del HTML
  correo: string = '';
  password: string = '';
  
  // Variable para mostrar errores si se equivoca de clave
  mensajeError: string = ''; 

  iniciarSesion() {
    this.mensajeError = ''; // Limpiamos errores anteriores

    // 1. Preparamos el paquete de datos (Debe llamarse igual que tu DTO en Spring Boot)
    const credenciales = {
      correo: this.correo,
      password: this.password
    };

    console.log('Enviando credenciales al servidor...', credenciales.correo);

    // 2. Hacemos la petición POST a tu API
    this.http.post('http://localhost:8080/api/auth/login', credenciales).subscribe({
      
      // 🟢 Si el backend dice "Todo OK" (Código 200)
      next: (respuesta: any) => {
        console.log('¡Login exitoso!', respuesta);
        
        // Guardamos los datos del usuario (id, nombre, rol...) en el navegador
        // para que el Dashboard sepa quién acaba de entrar.
        localStorage.setItem('usuarioSpotyDesk', JSON.stringify(respuesta));

        // Viajamos al panel
        this.router.navigate(['/dashboard']);
      },
      
      // 🔴 Si el backend dice "Error" (Código 400 - Tu ManejadorDeErrores)
      error: (errorRespuesta) => {
        console.error('Error en el login', errorRespuesta);
        
        // Extraemos el mensaje de tu backend ("Contraseña incorrecta" o "Correo no registrado")
        if (errorRespuesta.error && errorRespuesta.error.error) {
          this.mensajeError = errorRespuesta.error.error;
        } else {
          this.mensajeError = 'No se pudo conectar con el servidor. ¿Está encendido el backend?';
        }
      }
    });
  }
}
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
      error: (err) => {
        console.error('Error completo en el login:', err);
        
        // Buscamos el mensaje en las posibles estructuras de error de Spring Boot
        if (typeof err.error === 'string') {
          // A veces Spring Boot devuelve el texto pelado
          this.mensajeError = err.error;
        } else if (err.error?.message) {
          // Esta es la estructura más común
          this.mensajeError = err.error.message;
        } else if (err.error?.error) {
          this.mensajeError = err.error.error;
        } else {
          // Fallback por si acaso
          this.mensajeError = err.message || 'Error desconocido al iniciar sesión.';
        }
      }
    });
  }
}
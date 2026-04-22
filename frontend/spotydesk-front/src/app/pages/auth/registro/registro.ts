import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Añadido
import { FormsModule } from '@angular/forms'; // Añadido para el ngModel
import { CommonModule } from '@angular/common'; // Añadido para mostrar errores

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule], // Actualizado
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  private router = inject(Router);
  private http = inject(HttpClient); // Inyectamos el servicio HTTP

  // Variables para el formulario
  nombre: string = '';
  apellidos: string = '';
  nombreEmpresa: string = '';
  correo: string = '';
  password: string = '';
  
  mensajeError: string = '';

  registrarUsuario() {
    this.mensajeError = '';

    // Este objeto tiene que ser igual a tu RegistroRequest.java del backend
    const datosRegistro = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      nombreEmpresa: this.nombreEmpresa,
      correo: this.correo,
      password: this.password
    };

    console.log('Enviando registro al backend...', datosRegistro);

    this.http.post('http://localhost:8080/api/auth/registro', datosRegistro).subscribe({
      next: (respuesta) => {
        console.log('¡Registro exitoso!', respuesta);
        alert('Cuenta creada correctamente. Ya puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        // Capturamos el error de tu ManejadorDeErrores.java
        this.mensajeError = err.error?.error || 'Error en el servidor. Inténtalo más tarde.';
      }
    });
  }
}
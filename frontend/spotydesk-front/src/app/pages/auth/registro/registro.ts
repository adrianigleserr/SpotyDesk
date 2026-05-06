import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  private router = inject(Router);
  private http = inject(HttpClient);

  // Variables para el formulario
  nombre: string = '';
  apellidos: string = ''; // Lo mantenemos en plural aquí por compatibilidad con el Backend
  nombreEmpresa: string = '';
  correo: string = '';
  password: string = '';
  
  mensajeError: string = '';

  registrarUsuario() {
    this.mensajeError = '';

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
        this.mensajeError = err.error?.error || 'Error en el servidor. Inténtalo más tarde.';
      }
    });
  }
}
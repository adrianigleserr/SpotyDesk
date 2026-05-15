import { Component, OnInit, inject } from '@angular/core';
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
export class Registro implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);

  // Variables para el formulario
  nombre: string = '';
  apellidos: string = '';
  nombreEmpresa: string = ''; // Ahora guardará el valor seleccionado del desplegable
  correo: string = '';
  password: string = '';
  
  mensajeError: string = '';
  
  // NUEVO: Array para guardar las empresas que nos devuelva la BBDD
  empresasDisponibles: any[] = []; 

  ngOnInit() {
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    // Llamamos al backend para obtener todas las empresas registradas
    this.http.get<any[]>('http://localhost:8080/api/empresas').subscribe({
      next: (data) => {
        this.empresasDisponibles = data;
      },
      error: (err) => {
        console.error('Error al cargar la lista de empresas:', err);
      }
    });
  }

  registrarUsuario() {
    this.mensajeError = '';

    if (!this.nombreEmpresa) {
      this.mensajeError = 'Por favor, selecciona a qué empresa perteneces.';
      return;
    }

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
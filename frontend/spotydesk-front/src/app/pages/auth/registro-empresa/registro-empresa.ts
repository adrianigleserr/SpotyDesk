import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro-empresa.html'
})
export class RegistroEmpresa {
  private http = inject(HttpClient);
  private router = inject(Router);

  nombreEmpresa: string = '';
  dominio: string = '';
  mensajeError: string = '';

  registrar() {
    if (!this.nombreEmpresa || !this.dominio) {
      this.mensajeError = 'Todos los campos son obligatorios.';
      return;
    }

    const nuevaEmpresa = {
      nombreEmpresa: this.nombreEmpresa,
      dominioCorporativo: this.dominio
    };

    this.http.post('http://localhost:8080/api/empresas', nuevaEmpresa).subscribe({
      next: () => {
        alert('Empresa registrada con éxito. Ahora ya puedes registrar a los empleados.');
        this.router.navigate(['/registro']);
      },
      error: (err) => {
        console.error('Error completo del backend:', err);
        this.mensajeError = err.error?.message || err.error?.error || err.message || 'Error desconocido del servidor.';
      }
    });
  }
}
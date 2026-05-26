import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aprobaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aprobaciones.html'
})
export class Aprobaciones implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef); // El palo para despertar a Angular
  
  pendientes: any[] = [];
  idEmpresaActual: number | null = null;
  esAdmin: boolean = false;
  cargando: boolean = true; // Empezamos asumiendo que está cargando

  ngOnInit() {
    const usuarioJSON = localStorage.getItem('usuarioSpotyDesk');
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.idEmpresaActual = usuario.empresa ? usuario.empresa.idEmpresa : usuario.idEmpresa; 
      this.esAdmin = usuario.rol === 'ADMIN' || usuario.rol === 'Administrador';

      if (this.esAdmin && this.idEmpresaActual) {
        this.cargarPendientes();
      } else {
        this.cargando = false;
      }
    } else {
      this.cargando = false;
    }
  }

  cargarPendientes() {
    this.cargando = true;
    this.http.get(`http://localhost:8080/api/empleados/empresa/${this.idEmpresaActual}/pendientes`)
      .subscribe({
        next: (data: any) => {
          this.pendientes = data;
          this.cargando = false;
          this.cdr.detectChanges(); // ¡PINTA LA PANTALLA AHORA!
        },
        error: (err) => {
          console.error('Error al cargar pendientes', err);
          this.cargando = false;
          this.cdr.detectChanges();
        }
      });
  }

  cambiarEstado(empleado: any, nuevoEstado: string) {
    if (confirm(`¿Seguro que quieres ${nuevoEstado.toLowerCase()} a ${empleado.nombre}?`)) {
      this.http.put(`http://localhost:8080/api/empleados/${empleado.idEmpleado}/estado/${nuevoEstado}`, {}).subscribe({
        next: () => {
          this.cargarPendientes();
        },
        error: () => {
          alert('Hubo un error al procesar la solicitud.');
        }
      });
    }
  }
}
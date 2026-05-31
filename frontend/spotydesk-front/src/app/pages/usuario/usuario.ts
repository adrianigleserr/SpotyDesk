import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html'
})
export class Usuario implements OnInit {
  private router = inject(Router);

  usuario = {
    nombre: 'Cargando...',
    apellidos: '',
    email: '',
    puesto: 'Empleado',
    departamento: 'General',
    notificaciones: true,
    
    fechaIngreso: 'Sin determinar',
    asientoFavorito: 'No asignado',
    modalidad: 'Sin determinar',
    edificio: 'Sin determinar'
  };

  avatarUrl: string = ''; 

  ngOnInit() {
    const usuarioJSON = localStorage.getItem('usuarioSpotyDesk');
    if (usuarioJSON) {
      const datos = JSON.parse(usuarioJSON);
      
      // Cargamos los datos básicos que vienen del Login
      this.usuario.nombre = datos.nombre || '';
      this.usuario.apellidos = datos.apellido1 || '';
      this.usuario.email = datos.email || datos.correo || 'correo@spotydesk.com'; 
      this.usuario.puesto = datos.rol || 'Empleado';

      // --- NUEVO: Cargamos los datos de oficina si ya se habían guardado antes ---
      if (datos.departamento) this.usuario.departamento = datos.departamento;
      if (datos.notificaciones !== undefined) this.usuario.notificaciones = datos.notificaciones;
      if (datos.fechaIngreso) this.usuario.fechaIngreso = datos.fechaIngreso;
      if (datos.asientoFavorito) this.usuario.asientoFavorito = datos.asientoFavorito;
      if (datos.modalidad) this.usuario.modalidad = datos.modalidad;
      if (datos.edificio) this.usuario.edificio = datos.edificio;

      // Generamos la foto
      const apellido = datos.apellido1 || datos.apellidos || '';
      this.avatarUrl = `https://ui-avatars.com/api/?name=${this.usuario.nombre}+${apellido}&background=random&color=fff&bold=true`;
    }
  }

  guardarCambios() {
    const usuarioJSON = localStorage.getItem('usuarioSpotyDesk');
    
    // Si hay usuario logueado, lo parseamos. Si no, creamos un objeto vacío por seguridad
    let datosAGuardar = usuarioJSON ? JSON.parse(usuarioJSON) : {};

    // Inyectamos todos los valores del formulario al objeto
    datosAGuardar.nombre = this.usuario.nombre;
    datosAGuardar.correo = this.usuario.email;
    datosAGuardar.departamento = this.usuario.departamento;
    datosAGuardar.notificaciones = this.usuario.notificaciones;
    datosAGuardar.fechaIngreso = this.usuario.fechaIngreso;
    datosAGuardar.asientoFavorito = this.usuario.asientoFavorito;
    datosAGuardar.modalidad = this.usuario.modalidad;
    datosAGuardar.edificio = this.usuario.edificio;

    // Sobrescribimos el localStorage con el objeto actualizado
    localStorage.setItem('usuarioSpotyDesk', JSON.stringify(datosAGuardar));

    
  }

  cerrarSesion() {
    if (confirm('¿Seguro que quieres cerrar sesión?')) {
      console.log('Cerrando sesión...');
      localStorage.removeItem('usuarioSpotyDesk');
      this.router.navigate(['/login']).then(() => {
        window.location.reload(); 
      });
    }
  }
}
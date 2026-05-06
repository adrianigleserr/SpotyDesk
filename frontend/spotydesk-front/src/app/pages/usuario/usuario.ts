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
    
    fechaIngreso: '2024',
    asientoFavorito: 'No asignado',
    modalidad: 'Híbrido (3 días)',
    edificio: 'Sede Central (Planta 2)'
  };

  // <-- Añadimos la variable para guardar la foto
  avatarUrl: string = ''; 

  ngOnInit() {
    const usuarioJSON = localStorage.getItem('usuarioSpotyDesk');
    if (usuarioJSON) {
      const datos = JSON.parse(usuarioJSON);
      this.usuario.nombre = datos.nombre || '';
      this.usuario.apellidos = datos.apellido1 || '';
      this.usuario.email = datos.email || datos.correo || 'correo@spotydesk.com'; 

      // <-- Generamos la URL del avatar exactamente igual que en el menú
      const apellido = datos.apellido1 || datos.apellidos || '';
      this.avatarUrl = `https://ui-avatars.com/api/?name=${this.usuario.nombre}+${apellido}&background=random&color=fff&bold=true`;
    }
  }

  guardarCambios() {
    alert('¡Cambios guardados con éxito!');
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
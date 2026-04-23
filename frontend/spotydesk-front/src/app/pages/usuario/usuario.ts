import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html'
})
export class Usuario {
  usuario = {
    nombre: 'Alejo',
    apellidos: 'García',
    email: 'alejo.garcia@spotydesk.com',
    puesto: 'Desarrollador Frontend',
    departamento: 'Ingeniería de Software',
    notificaciones: true,
    
    // --- NUEVOS DATOS EXTRAS ---
    fechaIngreso: '2021',
    asientoFavorito: 'Puesto 42',
    modalidad: 'Híbrido (3 días)',
    edificio: 'Sede Central (Planta 2)'
  };

  guardarCambios() {
    alert('¡Cambios guardados con éxito!');
  }

  cerrarSesion() {
    console.log('Cerrando sesión...');
    alert('Has cerrado sesión');
  }
}
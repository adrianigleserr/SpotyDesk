import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas.html'
})
export class Reservas {
  // Por defecto, mostramos las reservas futuras
  filtroActivo: 'proximas' | 'pasadas' | 'canceladas' = 'proximas';

  // Base de datos simulada de reservas
  todasLasReservas = [
    { 
      id: 1, 
      fecha: '24 Abril, 2026', 
      diaSemana: 'Viernes',
      hora: '09:00 - 18:00', 
      puesto: 'Puesto 42', 
      zona: 'Ingeniería de Software', 
      estado: 'proximas' 
    },
    { 
      id: 2, 
      fecha: '27 Abril, 2026', 
      diaSemana: 'Lunes',
      hora: '09:00 - 15:00', 
      puesto: 'Puesto 42', 
      zona: 'Ingeniería de Software', 
      estado: 'proximas' 
    },
    { 
      id: 3, 
      fecha: '15 Abril, 2026', 
      diaSemana: 'Miércoles',
      hora: '10:00 - 19:00', 
      puesto: 'Puesto 12', 
      zona: 'Diseño y UX', 
      estado: 'pasadas' 
    },
    { 
      id: 4, 
      fecha: '10 Abril, 2026', 
      diaSemana: 'Viernes',
      hora: '08:00 - 14:00', 
      puesto: 'Puesto 05', 
      zona: 'Marketing y Ventas', 
      estado: 'canceladas' 
    }
  ];

  // Getter que devuelve solo las reservas del filtro seleccionado
  get reservasMostradas() {
    return this.todasLasReservas.filter(reserva => reserva.estado === this.filtroActivo);
  }

  cambiarFiltro(nuevoFiltro: 'proximas' | 'pasadas' | 'canceladas') {
    this.filtroActivo = nuevoFiltro;
  }

  cancelarReserva(id: number) {
    if(confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      const reservaIndex = this.todasLasReservas.findIndex(r => r.id === id);
      if (reservaIndex !== -1) {
        // Cambiamos el estado a cancelada
        this.todasLasReservas[reservaIndex].estado = 'canceladas';
        // Obligamos a Angular a detectar el cambio redibujando el array
        this.todasLasReservas = [...this.todasLasReservas]; 
      }
    }
  }
}
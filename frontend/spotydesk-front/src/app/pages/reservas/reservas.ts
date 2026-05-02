import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservas.html'
})
export class Reservas implements OnInit {
  private http = inject(HttpClient);

  // Por defecto, mostramos las reservas futuras
  filtroActivo: 'proximas' | 'pasadas' | 'canceladas' = 'proximas';
  
  // Array vacío que se llenará con la BBDD
  todasLasReservas: any[] = [];
  cargando = true;

  ngOnInit() {
    // Obtenemos quién ha iniciado sesión
    const usuarioJSON = localStorage.getItem('usuarioSpotyDesk');
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      if (usuario.idEmpleado) {
        this.cargarMisReservas(usuario.idEmpleado);
      } else {
        this.cargando = false;
      }
    } else {
      this.cargando = false;
    }
  }

  cargarMisReservas(idEmpleado: number) {
    this.http.get<any[]>(`http://localhost:8080/api/reservas/empleado/${idEmpleado}`).subscribe({
      next: (data) => {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Quitamos la hora para comparar solo el día

        // Transformamos los datos del backend al formato que necesita tu HTML
        this.todasLasReservas = data.map(r => {
          const fechaObj = new Date(r.fechaInicio);
          const fechaFinObj = new Date(r.fechaFin);
          
          // 1. Lógica para clasificar la reserva en las 3 pestañas
          let uiEstado = 'proximas';
          if (r.estado === 'Cancelada') {
            uiEstado = 'canceladas';
          } else if (fechaObj < hoy) {
            uiEstado = 'pasadas';
          }

          // 2. Formatear la hora bonita
          const horaInicio = fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
          const horaFin = fechaFinObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

          // 3. Devolvemos el objeto tal y como lo tenías en tu mock data original
          return {
            id: r.idReserva,
            fecha: fechaObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            diaSemana: fechaObj.toLocaleDateString('es-ES', { weekday: 'long' }),
            hora: `${horaInicio} - ${horaFin}`,
            puesto: r.sitio ? `Puesto ${r.sitio.numeroSitio}` : 'Sin asignar',
            zona: 'Planta Principal', 
            estado: uiEstado
          };
        });

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar las reservas desde la BBDD', err);
        this.cargando = false;
      }
    });
  }

  // Getter que devuelve solo las reservas del filtro seleccionado
  get reservasMostradas() {
    return this.todasLasReservas.filter(reserva => reserva.estado === this.filtroActivo);
  }

  cambiarFiltro(nuevoFiltro: 'proximas' | 'pasadas' | 'canceladas') {
    this.filtroActivo = nuevoFiltro;
  }

  cancelarReserva(id: number) {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      // Llamada real al backend para cancelar
      this.http.put(`http://localhost:8080/api/reservas/${id}/cancelar`, {}).subscribe({
        next: () => {
          const reservaIndex = this.todasLasReservas.findIndex(r => r.id === id);
          if (reservaIndex !== -1) {
            // Cambiamos el estado local a canceladas para que se mueva de pestaña
            this.todasLasReservas[reservaIndex].estado = 'canceladas';
            // Obligamos a Angular a detectar el cambio redibujando el array
            this.todasLasReservas = [...this.todasLasReservas]; 
          }
        },
        error: (err) => {
          console.error('Error al cancelar', err);
          alert('Hubo un error al cancelar la reserva en el servidor.');
        }
      });
    }
  }
}
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef); // <-- El "empujón" para refrescar la pantalla

  filtroActivo: 'proximas' | 'pasadas' | 'canceladas' = 'proximas';
  todasLasReservas: any[] = [];
  cargando = true;

  ngOnInit() {
    const usuarioJSON = localStorage.getItem('usuarioSpotyDesk');
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      if (usuario.idEmpleado) {
        this.cargarMisReservas(usuario.idEmpleado);
      } else {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    } else {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  parsearFechaSegura(fechaData: any): Date {
    if (!fechaData) return new Date();
    if (Array.isArray(fechaData)) {
      return new Date(fechaData[0], fechaData[1] - 1, fechaData[2], fechaData[3] || 0, fechaData[4] || 0);
    } 
    return new Date(fechaData);
  }

  cargarMisReservas(idEmpleado: number) {
    this.cargando = true;
    this.http.get<any[]>(`http://localhost:8080/api/reservas/empleado/${idEmpleado}`).subscribe({
      next: (data) => {
        console.log('✅ Reservas recibidas:', data);

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        this.todasLasReservas = data.map(r => {
          const fechaObj = this.parsearFechaSegura(r.fechaInicio);
          const fechaFinObj = this.parsearFechaSegura(r.fechaFin);
          
          let uiEstado = 'proximas';
          if (r.estado === 'Cancelada') {
            uiEstado = 'canceladas';
          } else if (fechaObj < hoy) {
            uiEstado = 'pasadas';
          }

          const horaInicio = fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
          const horaFin = fechaFinObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

          return {
            id: r.idReserva,
            fecha: fechaObj.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            diaSemana: fechaObj.toLocaleDateString('es-ES', { weekday: 'long' }),
            hora: `${horaInicio} - ${horaFin}`,
            puesto: r.sitio ? `Puesto ${r.sitio.numeroSitio}` : 'Sin asignar',
            zona: r.sitio ? r.sitio.zona : 'Oficina', 
            estado: uiEstado
          };
        });

        this.cargando = false;
        this.cdr.detectChanges(); // FORZAMOS EL REFRESCO DE LA PANTALLA
      },
      error: (err) => {
        console.error('❌ Error al cargar las reservas. ¿Está el backend encendido?', err);
        this.cargando = false;
        this.cdr.detectChanges(); // FORZAMOS EL REFRESCO AUNQUE FALLE
      }
    });
  }

  get reservasMostradas() {
    return this.todasLasReservas.filter(reserva => reserva.estado === this.filtroActivo);
  }

  cambiarFiltro(nuevoFiltro: 'proximas' | 'pasadas' | 'canceladas') {
    this.filtroActivo = nuevoFiltro;
    this.cdr.detectChanges();
  }

  cancelarReserva(id: number) {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.http.put(`http://localhost:8080/api/reservas/${id}/cancelar`, {}).subscribe({
        next: () => {
          const reservaIndex = this.todasLasReservas.findIndex(r => r.id === id);
          if (reservaIndex !== -1) {
            this.todasLasReservas[reservaIndex].estado = 'canceladas';
            this.todasLasReservas = [...this.todasLasReservas]; 
            this.cdr.detectChanges(); // FORZAMOS EL REFRESCO AL CANCELAR
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
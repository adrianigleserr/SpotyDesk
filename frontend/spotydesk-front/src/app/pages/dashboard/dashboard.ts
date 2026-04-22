import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  fechaVisual = new Date();
  fechaHoy = new Date();
  nombreMes = '';
  diaHoy = this.fechaHoy.getDate();
  diasDelMes: (number | null)[] = [];
  diaSeleccionado: number = this.diaHoy; // Por defecto hoy

  mostrarModalNota = false;
  nuevaNota = {
    titulo: '',
    hora: '09',    // Valor por defecto
    minutos: '00'  // Valor por defecto
  };

  // Aquí guardaremos todas las notas del sistema
  // Usamos un ID para poder borrarlas fácilmente
  todasLasNotas: any[] = [
    { id: 1, titulo: 'Reunión de Equipo', hora: '09:00 - 10:30', color: 'bg-blue-600', fechaClave: this.obtenerClave(this.diaHoy, this.fechaHoy.getMonth(), this.fechaHoy.getFullYear()) },
    { id: 2, titulo: 'Reserva Puesto 42', hora: 'Todo el día', color: 'bg-emerald-500', fechaClave: this.obtenerClave(this.diaHoy, this.fechaHoy.getMonth(), this.fechaHoy.getFullYear()) }
  ];

  ngOnInit() {
    this.actualizarCalendario();
  }

  // Función mágica para filtrar solo las notas del día que el usuario está viendo
  get notasDelDia() {
    const claveBusqueda = this.obtenerClave(this.diaSeleccionado, this.fechaVisual.getMonth(), this.fechaVisual.getFullYear());
    return this.todasLasNotas.filter(n => n.fechaClave === claveBusqueda);
  }

  obtenerClave(dia: number, mes: number, año: number): string {
    return `${dia}-${mes}-${año}`;
  }

  actualizarCalendario() {
    this.diasDelMes = [];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.nombreMes = meses[this.fechaVisual.getMonth()];

    const año = this.fechaVisual.getFullYear();
    const mes = this.fechaVisual.getMonth();
    const primerDiaSemana = new Date(año, mes, 1).getDay();
    const espaciosVacios = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;
    const ultimoDiaMes = new Date(año, mes + 1, 0).getDate();

    for (let i = 0; i < espaciosVacios; i++) this.diasDelMes.push(null);
    for (let i = 1; i <= ultimoDiaMes; i++) this.diasDelMes.push(i);
  }

  cambiarMes(direccion: number) {
    this.fechaVisual.setMonth(this.fechaVisual.getMonth() + direccion);
    this.fechaVisual = new Date(this.fechaVisual);
    this.actualizarCalendario();
  }

  seleccionarDia(dia: number) {
    this.diaSeleccionado = dia;
  }

  abrirModal() { this.mostrarModalNota = true; }
  cerrarModal() { this.mostrarModalNota = false; }

  guardarNota() {
    if (this.nuevaNota.titulo) {
      const claveNueva = this.obtenerClave(this.diaSeleccionado, this.fechaVisual.getMonth(), this.fechaVisual.getFullYear());

      // Combinamos la hora y minutos para el texto visual
      const horaFormateada = `${this.nuevaNota.hora}:${this.nuevaNota.minutos}`;

      this.todasLasNotas.push({
        id: Date.now(),
        titulo: this.nuevaNota.titulo,
        hora: horaFormateada,
        color: 'bg-amber-500',
        fechaClave: claveNueva
      });

      // Limpiamos y cerramos
      this.nuevaNota = { titulo: '', hora: '09', minutos: '00' };
      this.cerrarModal();
    }
  }

  eliminarNota(id: number) {
    this.todasLasNotas = this.todasLasNotas.filter(nota => nota.id !== id);
  }

  esHoy(dia: number | null): boolean {
    if (!dia) return false;
    return dia === this.diaHoy &&
      this.fechaVisual.getMonth() === this.fechaHoy.getMonth() &&
      this.fechaVisual.getFullYear() === this.fechaHoy.getFullYear();
  }
}
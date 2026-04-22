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
  diaSeleccionado: number = this.diaHoy;

  mostrarModalNota = false;

  // Objeto corregido para los inputs
  nuevaNota = {
    titulo: '',
    hora: '09',
    minutos: '00',
    horaFin: '',
    minutosFin: '',
    descripcion: ''
  };

  todasLasNotas: any[] = [
    { id: 1, titulo: 'Reunión de Equipo', hora: '09:00 - 10:30', color: 'bg-blue-600', fechaClave: this.obtenerClave(this.diaHoy, this.fechaHoy.getMonth(), this.fechaHoy.getFullYear()) },
  ];

  ngOnInit() {
    this.actualizarCalendario();
  }

  get notasDelDia() {
    const clave = this.obtenerClave(this.diaSeleccionado, this.fechaVisual.getMonth(), this.fechaVisual.getFullYear());
    return this.todasLasNotas.filter(n => n.fechaClave === clave);
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

  seleccionarDia(dia: number) { this.diaSeleccionado = dia; }
  abrirModal() { this.mostrarModalNota = true; }
  cerrarModal() { this.mostrarModalNota = false; }

  guardarNota() {
    if (this.nuevaNota.titulo) {
      const clave = this.obtenerClave(this.diaSeleccionado, this.fechaVisual.getMonth(), this.fechaVisual.getFullYear());

      // Formateo de horas con 2 dígitos (ej: 09:05)
      let tiempo = `${this.nuevaNota.hora.toString().padStart(2, '0')}:${this.nuevaNota.minutos.toString().padStart(2, '0')}`;

      if (this.nuevaNota.horaFin) {
        const minF = this.nuevaNota.minutosFin || '00';
        tiempo += ` - ${this.nuevaNota.horaFin.toString().padStart(2, '0')}:${minF.toString().padStart(2, '0')}`;
      }

      const nuevaNotaObj = {
        id: Date.now(),
        titulo: this.nuevaNota.titulo,
        hora: tiempo,
        descripcion: this.nuevaNota.descripcion,
        color: 'bg-blue-600',
        fechaClave: clave
      };

      this.todasLasNotas = [...this.todasLasNotas, nuevaNotaObj];

      this.nuevaNota = { titulo: '', hora: '09', minutos: '00', horaFin: '', minutosFin: '', descripcion: '' };
      this.cerrarModal();
    }
  }

  eliminarNota(id: number) {
    this.todasLasNotas = this.todasLasNotas.filter(n => n.id !== id);
  }

  esHoy(dia: number | null): boolean {
    if (!dia) return false;
    return dia === this.diaHoy &&
      this.fechaVisual.getMonth() === this.fechaHoy.getMonth() &&
      this.fechaVisual.getFullYear() === this.fechaHoy.getFullYear();
  }

  tieneNotas(dia: number | null): boolean {
    if (!dia) return false;
    // Buscamos si existe alguna nota con la fecha de este día concreto
    const clave = this.obtenerClave(dia, this.fechaVisual.getMonth(), this.fechaVisual.getFullYear());
    return this.todasLasNotas.some(nota => nota.fechaClave === clave);
  }
}
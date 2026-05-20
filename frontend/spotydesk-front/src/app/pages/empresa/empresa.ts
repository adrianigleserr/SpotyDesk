import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empresa.html'
})
export class Empresa implements OnInit {
  private http = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);

  oficina: any = { nombre: 'Cargando...', ubicacion: '...', horario: '08:00 - 20:00', aforoMaximo: 40 };
  
  estadisticas = [
    { titulo: 'Puestos Totales', valor: '0', icono: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', colorTexto: 'text-blue-600', colorFondo: 'bg-blue-50' },
    { titulo: 'Salas de Reunión', valor: '0', icono: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', colorTexto: 'text-indigo-600', colorFondo: 'bg-indigo-50' },
    { titulo: 'Ocupación', valor: '0%', icono: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', colorTexto: 'text-emerald-600', colorFondo: 'bg-emerald-50' }
  ];

  zonas = [{ nombre: 'Planta Principal', puestos: 40, color: 'bg-blue-500' }];

  diasDisponibles: any[] = [];
  fechaSeleccionada: Date = new Date();
  
  datosSitios: any[] = [];
  datosReservas: any[] = [];
  datosEmpleados: any[] = [];

  empleados: any[] = [];
  puestosTablero: any[] = [];
  columnas = 8;
  
  idEmpleadoActual: number | null = null;
  idEmpresaActual: number | null = null;

  sugerenciaSalaIA: string | null = null; // <-- NUEVA VARIABLE PARA EL MENSAJE DE LA IA

  ngOnInit() {
    this.generarDiasLaborables();
    
    const usuarioJSON = localStorage.getItem('usuarioSpotyDesk');
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.idEmpleadoActual = usuario.idEmpleado;
      this.idEmpresaActual = usuario.idEmpresa;
      this.cargarDatos(this.idEmpresaActual!);
    }
  }

  // --- LAS FUNCIONES ANTIGUAS SIGUEN IGUAL ---
  generarPlanoPorDefecto() { /* Función de emergencia que ya no usamos */ }

  generarDiasLaborables() {
    const hoy = new Date();
    let diasAgregados = 0;
    let diaActual = new Date(hoy);

    while (diasAgregados < 7) {
      if (diaActual.getDay() !== 0 && diaActual.getDay() !== 6) {
        this.diasDisponibles.push({
          fechaObject: new Date(diaActual),
          nombreDia: diaActual.toLocaleDateString('es-ES', { weekday: 'short' }),
          numeroDia: diaActual.getDate()
        });
        diasAgregados++;
      }
      diaActual.setDate(diaActual.getDate() + 1);
    }
    this.fechaSeleccionada = this.diasDisponibles[0].fechaObject;
  }

  cambiarFecha(dia: any) {
    this.fechaSeleccionada = dia.fechaObject;
    this.actualizarVistas();
  }

  esMismaFecha(fecha1: string, fecha2: Date): boolean {
    const str1 = fecha1.split('T')[0];
    const año = fecha2.getFullYear();
    const mes = String(fecha2.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha2.getDate()).padStart(2, '0');
    return str1 === `${año}-${mes}-${dia}`;
  }

  cargarDatos(idEmp: number) {
    this.http.get(`http://localhost:8080/api/empresas/${idEmp}`).subscribe((res: any) => {
      this.oficina.nombre = res.nombreEmpresa;
      this.oficina.ubicacion = "Dominio: @" + res.dominioCorporativo;
    });

    this.http.get(`http://localhost:8080/api/sitios/empresa/${idEmp}`).subscribe((sitios: any) => {
      this.datosSitios = sitios.sort((a: any, b: any) => a.posicionMatriz - b.posicionMatriz);
      
      this.http.get(`http://localhost:8080/api/reservas/empresa/${idEmp}`).subscribe((reservas: any) => {
        this.datosReservas = reservas;
        
        this.http.get(`http://localhost:8080/api/empleados/empresa/${idEmp}`).subscribe((emps: any) => {
          this.datosEmpleados = emps;
          this.actualizarVistas();
        });
      });
    });
  }

  actualizarVistas() {
    const reservasDelDia = this.datosReservas.filter((r: any) => 
      this.esMismaFecha(r.fechaInicio, this.fechaSeleccionada) && r.estado === 'Activa'
    );

    this.puestosTablero = this.datosSitios.map((s: any) => {
      // Buscamos TODAS las reservas vinculadas a este sitio (las salas pueden tener varias)
      const reservasDelSitio = reservasDelDia.filter((res: any) => res.sitio && res.sitio.idSitio === s.idSitio);
      
      // Comprobamos si yo (el usuario logueado) estoy entre los ocupantes
      const miReserva = reservasDelSitio.find((res: any) => res.empleado && res.empleado.idEmpleado === this.idEmpleadoActual);
      
      // La sala solo se bloquea ('ocupado') si los ocupantes superan o igualan su capacidad
      let estadoCalculado = 'libre';
      if (s.tipo === 'puesto') {
        estadoCalculado = reservasDelSitio.length > 0 ? 'ocupado' : 'libre';
      } else if (s.tipo === 'sala') {
        estadoCalculado = reservasDelSitio.length >= s.capacidad ? 'ocupado' : 'libre';
      }

      // Si hay ocupantes, unimos sus nombres separados por comas (ej: "Javier, Carla")
      const nombresOcupantes = reservasDelSitio.length > 0 
        ? reservasDelSitio.map((r: any) => r.empleado.nombre).join(', ') 
        : null;

      return {
        id: s.idSitio,
        nombre: s.numeroSitio,
        tipo: s.tipo,
        capacidad: s.capacidad,
        estado: estadoCalculado,
        ocupante: nombresOcupantes,
        ocupantesCount: reservasDelSitio.length,
        mio: !!miReserva,
        idReserva: miReserva ? miReserva.idReserva : null,
        recomendado: false
      };
    });

    this.empleados = this.datosEmpleados.map((e: any) => {
      const reservaDelEmpleado = reservasDelDia.find((r: any) => r.empleado && r.empleado.idEmpleado === e.idEmpleado);
      return {
        nombre: e.nombre,
        apellidos: e.apellido1,
        reserva: reservaDelEmpleado && reservaDelEmpleado.sitio ? `${reservaDelEmpleado.sitio.tipo === 'sala' ? 'Sala' : 'Puesto'} ${reservaDelEmpleado.sitio.numeroSitio.replace('P-', '')}` : null, 
        avatar: `https://ui-avatars.com/api/?name=${e.nombre}+${e.apellido1}&background=0D8ABC&color=fff`
      };
    });

    this.ejecutarIAProximidad();
    this.ejecutarIASugerenciaSalas();
    this.calcularEstadisticas();
    this.cdr.detectChanges();
  }

  ejecutarIASugerenciaSalas() {
    this.sugerenciaSalaIA = null;

    // Contamos cuántos compañeros hay en total hoy en la oficina
    const personasConReserva = this.empleados.filter(e => e.reserva !== null).length;

    // Si hay 3 o más...
    if (personasConReserva >= 3) {
      // Buscamos una sala que NO esté llena
      const salaDisponible = this.puestosTablero.find(p => p.tipo === 'sala' && p.estado === 'libre');

      if (salaDisponible) {
        salaDisponible.recomendado = true;
        
        // Mensaje dinámico: Si ya hay alguien dentro o si está vacía
        if (salaDisponible.ocupantesCount > 0) {
          this.sugerenciaSalaIA = `🤖 IA SpotyDesk: Sois ${personasConReserva} en la oficina hoy. ¡Únete a la reunión de ${salaDisponible.ocupante} en la ${salaDisponible.nombre} para hacer equipo!`;
        } else {
          this.sugerenciaSalaIA = `🤖 IA SpotyDesk: Hoy hay ${personasConReserva} compañeros en la oficina. Te sugerimos reservar la ${salaDisponible.nombre} para trabajar juntos.`;
        }
      }
    }
  }
  // ---------------------------------------------------

  reservarAsiento(celda: any) {
    if (celda.tipo === 'pasillo') return;

    if (!this.idEmpleadoActual || !this.idEmpresaActual) {
      alert('Error de sesión. Vuelve a iniciar sesión.');
      return;
    }

    if (celda.mio && celda.idReserva) {
      if (confirm(`¿Quieres dejar libre este ${celda.tipo}?`)) {
        this.http.put(`http://localhost:8080/api/reservas/${celda.idReserva}/cancelar`, {}).subscribe({
          next: () => this.cargarDatos(this.idEmpresaActual!),
          error: () => alert('Error al liberar.')
        });
      }
      return;
    }

    if (celda.estado === 'ocupado') return;

    const yaTengoSitio = this.puestosTablero.some(p => p.mio);
    if (yaTengoSitio) {
      alert('Ya tienes una reserva. Haz clic en ella para liberarla antes de elegir otra.');
      return;
    }

    const año = this.fechaSeleccionada.getFullYear();
    const mes = String(this.fechaSeleccionada.getMonth() + 1).padStart(2, '0');
    const dia = String(this.fechaSeleccionada.getDate()).padStart(2, '0');
    
    const fechaInicio = `${año}-${mes}-${dia}T08:00:00`;
    const fechaFin = `${año}-${mes}-${dia}T20:00:00`;

    const nuevaReserva = {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      estado: 'Activa',
      empleado: { idEmpleado: this.idEmpleadoActual },
      sitio: { idSitio: celda.id }
    };

    this.http.post('http://localhost:8080/api/reservas', nuevaReserva).subscribe({
      next: () => {
        this.cargarDatos(this.idEmpresaActual!);
      },
      error: () => {
        alert('No se pudo completar la reserva.');
      }
    });
  }

  ejecutarIAProximidad() {
    this.puestosTablero.forEach((p, i) => {
      if (p.estado === 'ocupado' && !p.mio && p.tipo === 'puesto') {
        const vecinos = [i - 1, i + 1, i - 8, i + 8];
        vecinos.forEach(v => {
          if (v >= 0 && v < this.puestosTablero.length) {
            const vecino = this.puestosTablero[v];
            if (vecino.tipo === 'puesto' && vecino.estado === 'libre') {
              vecino.recomendado = true;
            }
          }
        });
      }
    });
  }

  calcularEstadisticas() {
    const puestos = this.datosSitios.filter(s => s.tipo === 'puesto').length;
    const salas = this.datosSitios.filter(s => s.tipo === 'sala').length;
    const ocupados = this.puestosTablero.filter(p => p.estado === 'ocupado').length;

    this.estadisticas[0].valor = puestos.toString();
    this.estadisticas[1].valor = salas.toString();
    
    const totalSitios = puestos + salas;
    this.estadisticas[2].valor = totalSitios > 0 ? Math.round((ocupados / totalSitios) * 100) + '%' : '0%';
  }

  get empleadosEnOficina() { return this.empleados.filter(e => e.reserva !== null); }
  get empleadosEnRemoto() { return this.empleados.filter(e => e.reserva === null); }
}
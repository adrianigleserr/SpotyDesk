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

  oficina: any = {
    nombre: 'Cargando...',
    ubicacion: 'Consultando base de datos...',
    horario: '08:00 - 20:00',
    aforoMaximo: 120
  };

  estadisticas = [
    { titulo: 'Puestos Totales', valor: '40', icono: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', colorTexto: 'text-blue-600', colorFondo: 'bg-blue-50' },
    { titulo: 'Salas de Reunión', valor: '2', icono: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', colorTexto: 'text-indigo-600', colorFondo: 'bg-indigo-50' },
    { titulo: 'Ocupación Hoy', valor: '0%', icono: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', colorTexto: 'text-emerald-600', colorFondo: 'bg-emerald-50' }
  ];

  zonas = [{ nombre: 'Planta Principal', puestos: 40, color: 'bg-blue-500' }];
  empleados: any[] = [];

  // --- VARIABLES PARA EL MAPA ---
  columnas = 8;
  puestosTablero: any[] = [];

  ngOnInit() {
    const usuarioGuardado = localStorage.getItem('usuarioSpotyDesk');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      const idEmpresa = usuario.idEmpresa;

      // 1. Cargamos datos de la empresa
      this.cargarEmpresa(idEmpresa);
      
      // 2. Cargamos empleados
      this.cargarEmpleados(idEmpresa);

      // 3. ¡NUEVO! Cargamos los sitios REALES del backend
      this.cargarMapaReal(idEmpresa);
    }
  }

  cargarEmpresa(id: number) {
    this.http.get(`http://localhost:8080/api/empresas/${id}`).subscribe((datos: any) => {
      this.oficina.nombre = datos.nombreEmpresa;
      this.oficina.ubicacion = "Dominio corporativo: @" + datos.dominioCorporativo;
      this.cdr.detectChanges();
    });
  }

  cargarEmpleados(id: number) {
    this.http.get(`http://localhost:8080/api/empleados/empresa/${id}`).subscribe((res: any) => {
      this.empleados = res.map((e: any) => ({
        nombre: e.nombre,
        apellidos: e.apellido1,
        reserva: null,
        avatar: `https://ui-avatars.com/api/?name=${e.nombre}+${e.apellido1}&background=0D8ABC&color=fff`
      }));
      this.cdr.detectChanges();
    });
  }

  cargarMapaReal(id: number) {
    this.http.get(`http://localhost:8080/api/sitios/empresa/${id}`).subscribe((res: any) => {
      console.log('🏟️ Sitios reales recibidos:', res);
      
      // Ordenamos los sitios por su posición en la matriz para que no salgan desordenados
      this.puestosTablero = res.sort((a: any, b: any) => a.posicionMatriz - b.posicionMatriz)
        .map((s: any) => ({
          id: s.idSitio,
          nombre: s.numeroSitio,
          tipo: s.tipo,
          // Como aún no hay reservas, todos salen como 'libre' (verde)
          estado: 'libre' 
        }));
      
      this.cdr.detectChanges();
    });
  }

  get empleadosEnOficina() { return this.empleados.filter(e => e.reserva !== null); }
  get empleadosEnRemoto() { return this.empleados.filter(e => e.reserva === null); }
}
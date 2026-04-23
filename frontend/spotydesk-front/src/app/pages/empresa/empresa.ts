import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empresa.html'
})
export class Empresa {
  // Información general de la oficina
  oficina = {
    nombre: 'Sede Central SpotyDesk',
    ubicacion: 'Paseo de la Castellana 77, Madrid',
    horario: '08:00 - 20:00',
    aforoMaximo: 120
  };

  // Tarjetas de estadísticas superiores
  estadisticas = [
    { 
      titulo: 'Puestos Totales', 
      valor: '120', 
      icono: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', 
      colorTexto: 'text-blue-600', 
      colorFondo: 'bg-blue-50' 
    },
    { 
      titulo: 'Salas de Reunión', 
      valor: '8', 
      icono: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', 
      colorTexto: 'text-indigo-600', 
      colorFondo: 'bg-indigo-50' 
    },
    { 
      titulo: 'Ocupación Hoy', 
      valor: '64%', 
      icono: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', 
      colorTexto: 'text-emerald-600', 
      colorFondo: 'bg-emerald-50' 
    }
  ];

  // Zonas o departamentos para mostrar en el lateral
  zonas = [
    { nombre: 'Ingeniería de Software', puestos: 45, color: 'bg-blue-500' },
    { nombre: 'Diseño y UX', puestos: 15, color: 'bg-purple-500' },
    { nombre: 'Marketing y Ventas', puestos: 20, color: 'bg-amber-500' },
    { nombre: 'Recursos Humanos', puestos: 8, color: 'bg-emerald-500' }
  ];

  // ... tu código anterior (oficina, estadisticas, zonas) ...

  // Base de datos simulada de compañeros
  empleados = [
    { nombre: 'Alejo', apellidos: 'García', reserva: 'Puesto 42', avatar: 'https://ui-avatars.com/api/?name=Alejo+Garcia&background=0D8ABC&color=fff' },
    { nombre: 'María', apellidos: 'López', reserva: 'Puesto 12', avatar: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=8B5CF6&color=fff' },
    { nombre: 'Carlos', apellidos: 'Ruiz', reserva: 'Puesto 05', avatar: 'https://ui-avatars.com/api/?name=Carlos+Ruiz&background=10B981&color=fff' },
    { nombre: 'Laura', apellidos: 'Gómez', reserva: 'Sala de Reuniones A', avatar: 'https://ui-avatars.com/api/?name=Laura+Gomez&background=F59E0B&color=fff' },
    
    // Estos no tienen reserva hoy
    { nombre: 'David', apellidos: 'Martínez', reserva: null, avatar: 'https://ui-avatars.com/api/?name=David+Martinez&background=64748B&color=fff' },
    { nombre: 'Sofía', apellidos: 'Hernández', reserva: null, avatar: 'https://ui-avatars.com/api/?name=Sofia+Hernandez&background=64748B&color=fff' },
    { nombre: 'Hugo', apellidos: 'Fernández', reserva: null, avatar: 'https://ui-avatars.com/api/?name=Hugo+Fernandez&background=64748B&color=fff' }
  ];

  // Filtros automáticos
  get empleadosEnOficina() {
    return this.empleados.filter(emp => emp.reserva !== null);
  }

  get empleadosEnRemoto() {
    return this.empleados.filter(emp => emp.reserva === null);
  }
}
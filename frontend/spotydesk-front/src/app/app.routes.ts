import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/auth/login/login';
import { Registro } from './pages/auth/registro/registro';
import { RecuperarClave } from './pages/auth/recuperar-clave/recuperar-clave';
import { Empresa } from './pages/empresa/empresa';
import { Usuario } from './pages/usuario/usuario';
import { Reservas } from './pages/reservas/reservas';
import { RegistroEmpresa } from './pages/auth/registro-empresa/registro-empresa';
import { Aprobaciones } from './pages/Aprobaciones/aprobaciones';

// NUEVO IMPORT: Añadimos la ruta hacia tu nuevo componente de aprobaciones
// Asumiendo que has creado la carpeta dentro de 'pages'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Rutas de Autenticación
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-clave', component: RecuperarClave },
  { path: 'registro-empresa', component: RegistroEmpresa },
  
  // Rutas de Paneles
  { path: 'dashboard', component: Dashboard },
  { path: 'reservas', component: Reservas },
  { path: 'empresa', component: Empresa },
  { path: 'usuario', component: Usuario },
  
  // Ruta del Buzón de Notificaciones
  { path: 'aprobaciones', component: Aprobaciones },

  // Ruta comodín (si el usuario escribe una URL que no existe, lo mandamos al login)
  // ¡Importante que esta siempre sea la última!
  { path: '**', redirectTo: 'login' }
];
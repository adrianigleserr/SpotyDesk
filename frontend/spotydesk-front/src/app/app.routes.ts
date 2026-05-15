import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/auth/login/login';
import { Registro } from './pages/auth/registro/registro';
import { RecuperarClave } from './pages/auth/recuperar-clave/recuperar-clave';
import { Empresa } from './pages/empresa/empresa';
import { Usuario } from './pages/usuario/usuario';
import { Reservas } from './pages/reservas/reservas';

// NUEVO IMPORT: Añadimos la ruta hacia tu nuevo componente
import { RegistroEmpresa } from './pages/auth/registro-empresa/registro-empresa';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Rutas de Autenticación
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-clave', component: RecuperarClave },
  { path: 'registro-empresa', component: RegistroEmpresa }, // Ya funciona gracias al import
  
  // Rutas de Paneles
  { path: 'dashboard', component: Dashboard },
  { path: 'reservas', component: Reservas },
  { path: 'empresa', component: Empresa },
  { path: 'usuario', component: Usuario },

  { path: '**', redirectTo: 'login' }
];
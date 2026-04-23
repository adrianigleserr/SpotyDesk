import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/auth/login/login';
import { Registro } from './pages/auth/registro/registro';
import { RecuperarClave } from './pages/auth/recuperar-clave/recuperar-clave';
import { Empresa } from './pages/empresa/empresa';
import { Usuario } from './pages/usuario/usuario';
import { Reservas } from './pages/reservas/reservas';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Rutas de Autenticación
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-clave', component: RecuperarClave },
  
  // Rutas de Paneles (Aquí añadimos reservas)
  { path: 'dashboard', component: Dashboard },
  { path: 'reservas', component: Reservas },
  { path: 'empresa', component: Empresa },
  { path: 'usuario', component: Usuario },

  { path: '**', redirectTo: 'login' }
];
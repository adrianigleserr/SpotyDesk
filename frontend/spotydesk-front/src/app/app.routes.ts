import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/auth/login/login';
import { Registro } from './pages/auth/registro/registro';
import { RecuperarClave } from './pages/auth/recuperar-clave/recuperar-clave';
import { Empresa } from './pages/empresa/empresa';
import { Usuario } from './pages/usuario/usuario';

export const routes: Routes = [
  // Si el usuario no pone ninguna ruta, lo mandamos al login por defecto
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Rutas de Autenticación
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-clave', component: RecuperarClave },
  
  // Rutas de Paneles
  { path: 'dashboard', component: Dashboard },
  { path: 'empresa', component: Empresa },
  { path: 'usuario', component: Usuario },

  // Si pone una URL que no existe, lo mandamos al login (o a una página 404)
  { path: '**', redirectTo: 'login' }
];
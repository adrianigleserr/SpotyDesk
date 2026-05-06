import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  nombreUsuario: string = 'Invitado';
  avatarUrl: string = '';

  constructor(public router: Router) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const usuarioJSON = localStorage.getItem('usuarioSpotyDesk');
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.nombreUsuario = usuario.nombre || 'Usuario';
      
      // Creamos la URL del avatar con las iniciales y un color de fondo aleatorio
      const apellido = usuario.apellido1 || usuario.apellidos || '';
      this.avatarUrl = `https://ui-avatars.com/api/?name=${this.nombreUsuario}+${apellido}&background=random&color=fff&bold=true`;
    }
  }

  esRutaPublica(): boolean {
    const rutasPublicas = ['/login', '/registro', '/recuperar-clave', '/'];
    return rutasPublicas.includes(this.router.url);
  }
}
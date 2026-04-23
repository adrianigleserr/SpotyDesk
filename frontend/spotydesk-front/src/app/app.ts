import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',  // <-- Apunta a tu app.html
  styleUrl: './app.css'       // <-- Apunta a tu app.css
})
export class App { // Aunque el archivo sea app.ts, la clase suele llamarse AppComponent
  constructor(public router: Router) {}

  esRutaPublica(): boolean {
    const rutasPublicas = ['/login', '/registro', '/recuperar-clave', '/'];
    return rutasPublicas.includes(this.router.url);
  }
}
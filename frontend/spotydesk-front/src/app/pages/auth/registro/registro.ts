import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink], // Importamos RouterLink para el enlace de abajo
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  // Inyectamos el enrutador
  private router = inject(Router);

  registrarUsuario() {
    // Aquí en el futuro llamaremos a la API de tu compañero para guardar la empresa
    console.log('Simulando registro de nueva empresa...');
    
    // Y redirigimos al login
    this.router.navigate(['/login']);
  }
}
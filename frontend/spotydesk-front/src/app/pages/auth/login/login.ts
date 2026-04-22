import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Inyectamos el enrutador de Angular
  private router = inject(Router);

  iniciarSesion() {
    // Más adelante aquí llamaremos a la API de tu compañero.
    // Por ahora, simplemente simulamos que el login es correcto y viajamos al panel:
    console.log('Simulando validación de usuario...');
    this.router.navigate(['/dashboard']);
  }
}
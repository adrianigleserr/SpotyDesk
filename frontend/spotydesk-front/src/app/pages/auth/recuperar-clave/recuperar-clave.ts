import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recuperar-clave',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recuperar-clave.html',
  styleUrl: './recuperar-clave.css'
})
export class RecuperarClave {
  // Inyectamos el enrutador
  private router = inject(Router);

  enviarEnlace() {
    // Aquí tu compañero conectará el envío real del email en el backend
    console.log('Simulando envío de correo de recuperación...');
    
    // Devolvemos al usuario a la pantalla de login
    this.router.navigate(['/login']);
  }
}
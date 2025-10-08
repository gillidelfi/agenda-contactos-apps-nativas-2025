import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { RouterLink } from "@angular/router";
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {
  authService = inject(AuthService);
  openLogoutModal () {
    Swal.fire({
      title: "Desea cerrar sesión?",
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: false,
      cancelButtonText: "Cancelar",
      denyButtonText: `Cerra sesión`
    }).then((result) => {
      if (result.isDenied) { //reviso que haya clickeado en boton rojo: cerra sesion
        this.authService.logout();
      }
    });
  }
}

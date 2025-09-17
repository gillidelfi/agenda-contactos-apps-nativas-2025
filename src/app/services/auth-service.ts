import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggeado:boolean = false;
  router = inject(Router);
  token : null|string = localStorage.getItem("token");

  /**autentica al asuario en el back y nos devuelve el token */
  async login(loginData: LoginData){
    const res = await fetch("https://agenda-api.somee.com/api/authentication/authenticate",
      {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginData)
      }
    )
    if(res.ok){
      this.token = await res.text()
      localStorage.setItem("token",this.token);
      this.router.navigate(["/"])
    }
  }

  logout(){
    this.token = null;
    localStorage.removeItem("token");/** gaurda variables en el navegador para que no se borren al cambiar de pagina o dia */
    this.router.navigate(["/login"]);


  }
}

// 

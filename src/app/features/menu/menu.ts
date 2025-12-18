import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

  constructor(private router: Router){}

  private authService = inject(AuthService);

  async logout(){
    Swal.fire({
      title: "Deseja sair da conta?",
      width: 600,
      padding: "3em",
      color: "#cc110eff",
      background: "#ffb9b9ff",
      backdrop: `
        rgba(66, 0, 0, 0.4)
        left top
        no-repeat
      `,
      showDenyButton: true,
      denyButtonText: 'Não',
      confirmButtonText: `Sim`,
    }).then(async (result) => {
        if (result.isConfirmed) {
          await this.authService.logout();
          this.router.navigate(['/login']);
        }
    });
  }


}

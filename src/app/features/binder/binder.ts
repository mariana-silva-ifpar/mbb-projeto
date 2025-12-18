import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PcPage } from '../../interfaces/pc-page';
import { PhotocardService } from '../../services/photocard-service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-binder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binder.html',
  styleUrl: './binder.css'
})
export class BinderComponent implements OnInit {

  uid!: string;
  pages: PcPage[] = [];

  constructor(
    private authService: AuthService,
    private photocardService: PhotocardService,
    private router: Router
  ) {}


  async ngOnInit() {
  this.authService.getUser$().subscribe(async user => {
    if (!user) return;

    this.uid = user.uid;
    this.pages = await this.photocardService.loadBinder(this.uid);

    if (this.pages.length === 0) {
      this.addPage();
    }
  });
}


  addPage() {
    this.pages.push({
      id: crypto.randomUUID(),
      images: [null, null, null, null]
    });
  }

  removePage(index: number) {
    Swal.fire({
      title: "Deseja apagar a página?",
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
          this.pages.splice(index, 1);
          Swal.fire({
            title: 'Página excluída com sucesso!',
            color: "#e99392",
            background: "#f5e2e2ff",
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
    });

  }

  
  addImage(pageIndex: number, imgIndex: number) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.pages[pageIndex].images[imgIndex] = reader.result as string;
      };

      reader.readAsDataURL(file);
    };

    input.click();
  }

  removeImage(pageIndex: number, imgIndex: number) {
    Swal.fire({
      title: "Deseja apagar a imagem?",
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
          this.pages[pageIndex].images[imgIndex] = null;
          Swal.fire({
            title: 'Imagem excluída com sucesso!',
            color: "#e99392",
            background: "#f5e2e2ff",
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
    });
  }

  async save() {
    await this.photocardService.saveBinder(this.uid, this.pages);
    Swal.fire({
      title: "Binder salvo com sucesso.",
      icon: 'success',
      width: 600,
      padding: "3em",
      color: "#e99392",
      background: "#f5e2e2ff",
      backdrop: `
        rgba(68, 68, 126, 0.4)
        left top
        no-repeat
      `
    });
  }

  
  goBack() {
    Swal.fire({
      title: "Dados não salvos serão perdidos. Deseja voltar para a página inicial?",
      width: 600,
      padding: "3em",
      color: "#e99392",
      background: "#f5e2e2ff",
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
          this.router.navigate(['/inicio']);
        }
    });
  }

  trackById(index: number, page: PcPage) {
    return page.id;
  }
}

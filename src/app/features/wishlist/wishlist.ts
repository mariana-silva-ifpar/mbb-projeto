import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist-service';
import Swal from 'sweetalert2'

interface WishlistItem {
  id: string;
  url: string;
  title: string;
}

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {

  photos: WishlistItem[] = [];
  private wishlistService = inject(WishlistService);

  constructor(private router: Router) {}

  /* ================================
        CARREGAR AO ABRIR
  ================================= */
  async ngOnInit() {
    this.photos = await this.wishlistService.getAll();
  }

  /* ================================
        ADICIONAR FOTO
  ================================= */
  addPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async () => {
        const title = prompt('Digite um título para o photocard:') || 'Sem título';

        this.photos.push({
          id: crypto.randomUUID(),
          url: reader.result as string,
          title
        });

      };

      reader.readAsDataURL(file);
    };

    input.click();
  }

  /* ================================
        REMOVER
  ================================= */
  async removePhoto(id: string) {
    this.photos = this.photos.filter(p => p.id !== id);
    await this.wishlistService.saveAll(this.photos);
  }

  /* ================================
        SALVAMENTO MANUAL
  ================================= */
  async saveWishlist() {
    await this.wishlistService.saveAll(this.photos);
    Swal.fire({
      title: "Wishlist salva com sucesso.",
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

  /* ================================
        LIMPAR
  ================================= */
  async resetWishlist() {
    Swal.fire({
      title: "Deseja limpar a wishlist?",
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
        Swal.fire("Wishlist limpa com sucesso");
        this.photos = [];
        await this.wishlistService.clear();
      }
    });
  }

  /* ================================
        VOLTAR
  ================================= */
  goBackToMenu() {
    this.router.navigate(['/inicio']);
  }

  trackById(index: number, item: WishlistItem) {
    return item.id;
  }
}

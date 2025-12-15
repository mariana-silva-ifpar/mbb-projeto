import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist-service';

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

        // salva tudo (porque o service salva lista inteira)
        await this.wishlistService.saveAll(this.photos);
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
    alert('Wishlist salva com sucesso 💖');
  }

  /* ================================
        LIMPAR
  ================================= */
  async resetWishlist() {
    if (!confirm('Deseja limpar toda a wishlist?')) return;

    this.photos = [];
    await this.wishlistService.clear();
  }

  /* ================================
        VOLTAR
  ================================= */
  goBackToMenu() {
    this.router.navigate(['/menu']);
  }

  trackById(index: number, item: WishlistItem) {
    return item.id;
  }
}

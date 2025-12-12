import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {

  // 5 slots para 5 botões em uma linha
  photos: Array<{ url: string } | null> = Array(5).fill(null);

  constructor(private router: Router) {}

  // --- ADICIONAR FOTO ---
  addPhoto(index: number) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        this.photos[index] = { url: reader.result as string };
      };
      reader.readAsDataURL(file);
    };

    input.click();
  }

  // --- REMOVER FOTO ---
  removePhoto(index: number) {
    this.photos[index] = null;
    this.reorganizePhotos();
  }

  // --- REORGANIZAR FOTOS ---
  reorganizePhotos() {
    const filled = this.photos.filter(p => p !== null);
    const empty = this.photos.filter(p => p === null);
    this.photos = [...filled, ...empty];
  }

  // --- VOLTAR AO MENU ---
  goBackToMenu() {
    // Altere '/menu' para a rota do seu menu principal
    this.router.navigate(['/menu']);
  }

  // --- RESETAR WISHLIST ---
  resetWishlist() {
    this.photos = Array(5).fill(null);
  }
}

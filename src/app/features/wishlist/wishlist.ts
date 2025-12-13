import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
export class Wishlist {
  

  photos: WishlistItem[] = [];

  constructor(private router: Router) {}

  addPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const title =
          prompt('Digite um título para o photocard:') || 'Sem título';

        this.photos = [
          ...this.photos,
          {
            id: crypto.randomUUID(),
            url: reader.result as string,
            title
          }
        ];
      };

      reader.readAsDataURL(file);
    };

    input.click();
  }

  removePhoto(id: string) {
    this.photos = this.photos.filter(p => p.id !== id);
  }

  resetWishlist() {
    if (!confirm('Deseja limpar toda a wishlist?')) return;
    this.photos = [];
  }

  goBackToMenu() {
    this.router.navigate(['/menu']);
  }

  trackById(index: number, item: WishlistItem) {
    return item.id;
  }
}

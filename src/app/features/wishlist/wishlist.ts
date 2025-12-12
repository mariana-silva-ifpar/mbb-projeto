import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {

}

const grid = document.getElementById("photo-grid") as HTMLElement;
const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;

let photos: (string | null)[] = Array(8).fill(null);

/* renderiza os cards */
function renderGrid() {
  grid.innerHTML = "";

  photos.forEach((photo, index) => {
    const card = document.createElement("div");
    card.className = "photo-card";

    // card com imagem
    if (photo) {
      const img = document.createElement("img");
      img.src = photo;
      img.className = "preview";

      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.textContent = "x";

      removeBtn.onclick = () => removePhoto(index);

      card.appendChild(img);
      card.appendChild(removeBtn);

    } else {
      // card vazio (+)
      const label = document.createElement("label");
      label.className = "add-btn";
      label.textContent = "+";

      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.hidden = true;

      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        photos[index] = url;
        renderGrid();
      };

      label.appendChild(input);
      card.appendChild(label);
    }

    grid.appendChild(card);
  });
}

/* remover card e reorganizar */
function removePhoto(index: number) {
  photos = photos.filter((_, i) => i !== index);
  photos.push(null); // mantém sempre 8 cards
  renderGrid();
}

/* reset */
resetBtn.onclick = () => {
  photos = Array(8).fill(null);
  renderGrid();
};

/* iniciar */
renderGrid();


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { PcPage } from '../../interfaces/pc-page';
import { PhotocardService } from '../../services/photocard-service';
import { AuthService } from '../../services/auth.service';

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
    this.uid = this.authService.getUserUid();
    this.pages = await this.photocardService.loadBinder(this.uid);

    if (this.pages.length === 0) {
      this.addPage();
    }
  }

  addPage() {
    this.pages.push({
      id: crypto.randomUUID(),
      images: [null, null, null, null]
    });
  }

  removePage(index: number) {
    this.pages.splice(index, 1);
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
    this.pages[pageIndex].images[imgIndex] = null;
  }

  async save() {
    await this.photocardService.saveBinder(this.uid, this.pages);
    alert('Binder salvo com sucesso 💖');
  }

  
  goBack() {
    this.router.navigate(['/inicio']);
  }

  trackById(index: number, page: PcPage) {
    return page.id;
  }
}

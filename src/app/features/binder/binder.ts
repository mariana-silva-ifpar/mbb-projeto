import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PcPage } from '../../interfaces/pc-page';
import { PhotocardService } from '../../services/photocard-service';
import { AuthService } from '../../services/auth.service';

import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-binder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './binder.html',
  styleUrls: ['./binder.css']
})
export class BinderComponent implements OnInit {

  uid!: string;
  pages: PcPage[] = [];

  constructor(
    private authService: AuthService,
    private photocardService: PhotocardService,
    private auth: Auth
  ) {}

  // 🔐 GARANTE QUE O USUÁRIO ESTÁ AUTENTICADO
  ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (!user) {
        console.error('Usuário não autenticado');
        return;
      }

      this.uid = user.uid;
      await this.load();
    });
  }

  async load() {
    this.pages = await this.photocardService.loadBinder(this.uid);

    if (this.pages.length === 0) {
      this.addPage();
    }
  }

  addPage() {
    this.pages.push({
      id: Date.now(),
      images: [null, null, null, null]
    });
  }

  removePage(pageIndex: number) {
    this.pages.splice(pageIndex, 1);
  }

  async uploadImage(event: any, pageIndex: number, imgIndex: number) {
    const file = event.target.files[0];
    if (!file || !this.uid) return;

    const url = await this.photocardService.uploadImage(this.uid, file);
    this.pages[pageIndex].images[imgIndex] = url;
  }

  async removeImage(pageIndex: number, imgIndex: number) {
    const url = this.pages[pageIndex].images[imgIndex];

    if (url) {
      await this.photocardService.deleteImageByUrl(url);
    }

    this.pages[pageIndex].images[imgIndex] = null;
  }

  async save() {
    await this.photocardService.saveBinder(this.uid, this.pages);
    alert('Binder salvo com sucesso!');
  }
}

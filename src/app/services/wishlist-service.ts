import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  writeBatch
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {}

  /* =========================
     UID DO USUÁRIO
  ========================= */
  private get uid(): string {
    const uid = this.auth.currentUser?.uid;
    if (!uid) {
      throw new Error('Usuário não autenticado');
    }
    return uid;
  }

  /* =========================
     REFERÊNCIA DA COLEÇÃO
  ========================= */
  private get wishlistCollection() {
    return collection(this.firestore, `users/${this.uid}/wishlist`);
  }

  /* =========================
     CARREGAR WISHLIST
  ========================= */
  async getAll(): Promise<
    { id: string; url: string; title: string }[]
  > {
    const snapshot = await getDocs(this.wishlistCollection);

    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as { url: string; title: string })
    }));
  }

  /* =========================
     SALVAR TODA A WISHLIST
     (USADO PELO BOTÃO SALVAR)
  ========================= */
  async saveAll(
    photos: { url: string; title: string }[]
  ): Promise<void> {

    const batch = writeBatch(this.firestore);

    // Apaga tudo que existe
    const snapshot = await getDocs(this.wishlistCollection);
    snapshot.docs.forEach(docSnap => {
      batch.delete(docSnap.ref);
    });

    // Recria com o estado atual
    photos.forEach(photo => {
      const newDocRef = doc(this.wishlistCollection);
      batch.set(newDocRef, {
        url: photo.url,
        title: photo.title
      });
    });

    await batch.commit();
  }

  /* =========================
     LIMPAR WISHLIST
  ========================= */
  async clear(): Promise<void> {
    const snapshot = await getDocs(this.wishlistCollection);
    for (const docSnap of snapshot.docs) {
      await deleteDoc(docSnap.ref);
    }
  }
}

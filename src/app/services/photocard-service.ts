import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { PcPage } from '../interfaces/pc-page';

@Injectable({
  providedIn: 'root'
})
export class PhotocardService {

  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) {}

  async saveBinder(uid: string, pages: PcPage[]) {
    const refDoc = doc(this.firestore, `users/${uid}/binder/data`);
    await setDoc(refDoc, { pages });
  }

  async loadBinder(uid: string): Promise<PcPage[]> {
    const refDoc = doc(this.firestore, `users/${uid}/binder/data`);
    const snap = await getDoc(refDoc);
    return snap.exists() ? snap.data()['pages'] : [];
  }

  async uploadImage(uid: string, file: File): Promise<string> {
    const imageRef = ref(
      this.storage,
      `binders/${uid}/${Date.now()}-${file.name}`
    );

    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
  }

  async deleteImageByUrl(url: string) {
    const imageRef = ref(this.storage, url);
    await deleteObject(imageRef);
  }
}

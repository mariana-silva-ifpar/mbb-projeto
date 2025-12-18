import { Injectable } from '@angular/core';
import {Firestore, collection, doc, getDocs, query, setDoc, where} from '@angular/fire/firestore'
import { User } from '../interfaces/user';
 
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  async usernameExists(username: string): Promise<boolean> {
    const usersRef = collection(this.firestore, 'users');

    const q = query(
      usersRef,
      where('username', '==', username)
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty; // true se já existir
  }
  
  createUserData(user: User) {
    return setDoc(doc(this.firestore, 'users', user.uid), user);
  }
  
}

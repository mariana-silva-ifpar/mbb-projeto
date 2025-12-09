import { Injectable } from '@angular/core';
import {Firestore, doc, setDoc} from '@angular/fire/firestore'
import { User } from '../interfaces/user';
 
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  createUserData(user: User) {
    return setDoc(doc(this.firestore, 'users', user.uid), user);
  }
  
}

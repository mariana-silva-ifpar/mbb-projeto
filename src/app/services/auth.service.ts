import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { UserService } from './user.service';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth: Auth,
    private userService: UserService,
    private firestore: Firestore
  ){}

  async register(form: any){
    const credential = await createUserWithEmailAndPassword(
      this.auth,
      form.email,
      form.password
    );

    const firebaseUser = credential.user;

    await updateProfile(firebaseUser, {
      displayName: form.name
    });

    await this.userService.createUserData({
      uid: firebaseUser.uid,
      name: form.name,
      email: form.email,
      username: form.username,
      password: form.password,
      createdAt: new Date()
    });

    return firebaseUser;
  }

  async login(username: string, password: string) {

    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('username', '==', username));
    const result = await getDocs(q);

    if (result.empty) {
      throw new Error('Usuário não encontrado');
    }

    const userData: any = result.docs[0].data();
    const email = userData.email;

    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
}

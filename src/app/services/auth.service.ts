import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User
} from '@angular/fire/auth';

import { UserService } from './user.service';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private auth: Auth,
    private userService: UserService,
    private firestore: Firestore
  ) {}

  // =========================
  // REGISTRO
  // =========================
  async register(form: any) {

    const usernameAlreadyExists = await this.userService.usernameExists(form.username);

    if (usernameAlreadyExists) {
      throw new Error('Este nome de usuário já está em uso');
    }

    try{
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
    } catch(error: any){
      if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este e-mail já está em uso');
    }

    throw error
    }
    
  }

  // =========================
  // LOGIN
  // =========================
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

  // =========================
  // LOGOUT
  // =========================
  async logout(){
    await signOut(this.auth);
  }

  // =========================
  // 🔑 MÉTODOS NOVOS (IMPORTANTE)
  // =========================

  /** Retorna o usuário atual do Firebase */
  getCurrentUser() {
    return this.auth.currentUser;
  }

  /** Retorna o UID do usuário logado */
  getUserUid(): string {
    const user = this.auth.currentUser;

    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    return user.uid;
  }

  getUser$(): Observable<User | null> {
    return authState(this.auth);
  }
}

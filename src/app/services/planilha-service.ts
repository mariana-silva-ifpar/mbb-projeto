import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot
} from '@angular/fire/firestore';
import { ItemPlanilha } from '../features/planilha/form-item/form-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanilhaService {

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
     REFERÊNCIAS DO FIRESTORE
  ========================= */
  private get planilhaCollection() {
    return collection(this.firestore, `users/${this.uid}/planilha`);
  }

  private getItemDoc(id: string) {
    return doc(this.firestore, `users/${this.uid}/planilha/${id}`);
  }

  /* =========================
     1. SALVAR (Cria ou Atualiza)
  ========================= */
  async salvar(item: ItemPlanilha): Promise<ItemPlanilha> {
    try {
      if (item.id) {
        // ATUALIZA item existente
        const { id, ...dados } = item;
        await updateDoc(this.getItemDoc(id), {
          ...dados,
          updatedAt: new Date()
        });
        return item;
      } else {
        // CRIA novo item (Firestore gera ID automático)
        const { id: _, ...dadosSemId } = item;
        const docRef = await addDoc(this.planilhaCollection, {
          ...dadosSemId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        // Retorna o item com o ID real do Firestore
        return { ...item, id: docRef.id };
      }
    } catch (error) {
      throw error;
    }
  }

  /* =========================
     2. EXCLUIR
  ========================= */
  async excluir(id: string): Promise<void> {
    try {
      await deleteDoc(this.getItemDoc(id));
    } catch (error) {
      throw error;
    }
  }

  /* =========================
     3. OBTER TODOS
  ========================= */
  async obterTodos(): Promise<ItemPlanilha[]> {
    try {
      const q = query(this.planilhaCollection, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      return snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data() as Omit<ItemPlanilha, 'id'>
      }));
    } catch (error) {
      throw error;
    }
  }

  /* =========================
     4. OBSERVAR EM TEMPO REAL (OPCIONAL)
  ========================= */
  observarItens(): Observable<ItemPlanilha[]> {
    return new Observable<ItemPlanilha[]>((subscriber) => {
      const q = query(this.planilhaCollection, orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const itens = snapshot.docs.map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data() as Omit<ItemPlanilha, 'id'>
          }));
          subscriber.next(itens);
        },
        (error) => {
          subscriber.error(error);
        }
      );

      return () => unsubscribe();
    });
  }
}
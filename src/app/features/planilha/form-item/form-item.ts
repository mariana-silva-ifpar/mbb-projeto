import { Component } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.html',
  styleUrls: ['./form-item.css']
})
export class FormItemComponent {

  novoItem = {
    nome: '',
    preco: null,
    categoria: ''
  };

  constructor(private firestore: Firestore) {}

  async salvar() {
    const colRef = collection(this.firestore, 'produtos'); // altere se sua coleção tiver outro nome

    await addDoc(colRef, this.novoItem);

    // limpar formulário
    this.novoItem = { nome: '', preco: null, categoria: '' };
  }
}
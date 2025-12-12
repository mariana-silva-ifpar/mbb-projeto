import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-tabela-itens',
  templateUrl: './tabela-itens.html',
  styleUrls: ['./tabela-itens.css']
})
export class TabelaItensComponent implements OnInit {

  itens: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const col = collection(this.firestore, 'produtos'); // altere se necessário

    collectionData(col, { idField: 'id' }).subscribe(data => {
      this.itens = data;
    });
  }

  async excluir(item: any) {
    const ref = doc(this.firestore, `produtos/${item.id}`);
    await deleteDoc(ref);
  }
}
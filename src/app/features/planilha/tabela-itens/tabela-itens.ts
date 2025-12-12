import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabela-itens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-itens.html',
  styleUrls: ['./tabela-itens.css']
})
export class TabelaItensComponent {

  itens = [
    { nome: 'Item A', preco: 100, categoria: 'X' },
    { nome: 'Item B', preco: 200, categoria: 'Y' }
  ];

  editar(item: any) {
    console.log('Editar', item);
  }

  excluir(index: number) {
    this.itens.splice(index, 1);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPlanilha } from '../form-item/form-item';

@Component({
  selector: 'app-tabela-itens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabela-itens.html',
  styleUrls: ['./tabela-itens.css']
})
export class TabelaItensComponent {

  @Input() itens: ItemPlanilha[] = [];
  @Output() editarItem = new EventEmitter<ItemPlanilha>();

  editar(item: ItemPlanilha) {
   this.editarItem.emit(item);
  }

  excluir(index: number) {
    this.itens.splice(index, 1);
  }
}

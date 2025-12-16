import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormItemComponent, ItemPlanilha } from './form-item/form-item';
import { TabelaItensComponent } from './tabela-itens/tabela-itens';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planilha',
  standalone: true,
  imports: [CommonModule, FormItemComponent, TabelaItensComponent],
  templateUrl: './planilha.html',
  styleUrls: ['./planilha.css']
})
export class PlanilhaComponent {

  constructor(private router: Router) {}

  itens: ItemPlanilha[] = [];
  itemParaEditar: ItemPlanilha | null = null;

  salvarItem(item: ItemPlanilha) {
    const index = this.itens.findIndex(i => i.id === item.id);

    if (index >= 0) {
      this.itens[index] = item;
    } else {
      this.itens.push(item);
    }

    this.itemParaEditar = null;
  }

  editarItem(item: ItemPlanilha) {
    this.itemParaEditar = item;
  }

  excluirItem(item: ItemPlanilha) {
    this.itens = this.itens.filter(i => i.id !== item.id);
  }

  goBackToMenu() {
    this.router.navigate(['/inicio']);
  }
}

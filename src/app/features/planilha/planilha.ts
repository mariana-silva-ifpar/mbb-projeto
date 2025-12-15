import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormItemComponent, ItemPlanilha } from './form-item/form-item';
import { TabelaItensComponent } from './tabela-itens/tabela-itens';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-planilha',
  standalone: true,
  imports: [CommonModule, FormItemComponent, TabelaItensComponent, ReactiveFormsModule],
  templateUrl: './planilha.html',
  styleUrls: ['./planilha.css']
})
export class PlanilhaComponent {

  form!: FormGroup;

  itemParaEditar: ItemPlanilha | null = null;
  itens: ItemPlanilha[] = [];

  salvarItem(item: ItemPlanilha) {

    const index = this.itens.findIndex(i => i.id === item.id);
    if (index >= 0) {
      this.itens[index] = item;
    }

    else {
        this.itens.push(item);
    }
   
    this.itemParaEditar = null;
  }

  editarItem(item: ItemPlanilha) {
   this.itemParaEditar = item;
}


}




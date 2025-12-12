import { Component } from '@angular/core';
import { FormItemComponent } from "./form-item/form-item";
import { TabelaItensComponent } from "./tabela-itens/tabela-itens";

@Component({
  selector: 'app-planilha',
  imports: [FormItemComponent, TabelaItensComponent],
  templateUrl: './planilha.html',
  styleUrl: './planilha.css',
})
export class Planilha {

}

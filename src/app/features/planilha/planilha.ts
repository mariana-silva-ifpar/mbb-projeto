import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TabelaItensComponent } from './tabela-itens/tabela-itens';

@Component({
  selector: 'app-planilha',
  templateUrl: './planilha.html',
  imports: [ReactiveFormsModule, TabelaItensComponent],
  styleUrls: ['./planilha.css']
})
export class PlanilhaComponent {
  form: FormGroup;

  itemParaEditar: any = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      categoria: ['', Validators.required],
    });
  }

  salvar() {
    if (this.form.valid) {
      console.log(this.form.value);  // Aqui você pode fazer a conexão com o banco de dados
    }
  }
}

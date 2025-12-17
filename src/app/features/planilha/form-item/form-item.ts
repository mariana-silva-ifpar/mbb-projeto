import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface ItemPlanilha {
  id: string;
  nome: string;
  precoProduto: number;
  produtoPago: boolean;
  freteInternacional: number;
  freteInternacionalPago: boolean;
  freteNacional: number;
  freteNacionalPago: boolean;
  statusEnvio: string;
}

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-item.html',
  styleUrls: ['./form-item.css']
})
export class FormItemComponent implements OnInit, OnChanges {

  @Input() itemParaEditar: ItemPlanilha | null = null;
  @Output() salvarItem = new EventEmitter<ItemPlanilha>();

  form!: FormGroup;

  statusOptions = ['Não enviado', 'Em trânsito', 'Vindo pra mim', 'Entregue'];

  constructor(private fb: FormBuilder) {}

 ngOnInit() {
  this.form = this.fb.group({
    nome: ['', Validators.required],

    precoProduto: [0, Validators.required],
    produtoPago: [false],

    freteInternacional: [0],
    freteInternacionalPago: [false],

    freteNacional: [0],
    freteNacionalPago: [false],

    statusEnvio: ['Não enviado', Validators.required]
  });
}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemParaEditar'] && this.itemParaEditar) {
      this.form.patchValue(this.itemParaEditar);
    }
  }

  salvar() {

    console.log("clicar em salvar");
    console.log(this.form.value);

    if (this.form.invalid){
      console.log("formulario invalido");
      return;
    }

    const item: ItemPlanilha = {
      id: this.itemParaEditar?.id ?? crypto.randomUUID(),
      ...this.form.value
    };

    this.salvarItem.emit(item);
    this.form.reset({ statusEnvio: 'Não enviado' });
  }

  get textoBotao(): string {
    return this.itemParaEditar ? 'Atualizar' : 'Salvar';
  }
}

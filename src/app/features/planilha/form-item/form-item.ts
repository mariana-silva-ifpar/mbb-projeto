import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface ItemPlanilha {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
}

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-item.html',
  styleUrls: ['./form-item.css']
})
export class FormItemComponent implements OnInit, OnChanges {

  @Input() itemParaEditar: ItemPlanilha | null = null;
  @Output() salvarItem = new EventEmitter<ItemPlanilha>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemParaEditar'] && this.itemParaEditar) {
      this.form.patchValue(this.itemParaEditar);
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const item: ItemPlanilha = {
      id: this.itemParaEditar?.id ?? crypto.randomUUID(),
      ...this.form.value
    };

    this.salvarItem.emit(item);
    this.form.reset();
  }

  get textoBotao(): string {
    return this.itemParaEditar == null ? 'Salvar' : 'Atualizar';
}
}

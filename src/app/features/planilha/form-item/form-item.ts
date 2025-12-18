import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlanilhaService } from '../../../services/planilha-service';
import Swal from 'sweetalert2'

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

  private planilhaService = inject(PlanilhaService);

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

  async salvar() {

    if (this.form.invalid) {
      Swal.fire({
        title: "Campos inválidos. Por favor, preencha novamente.",
        width: 600,
        padding: "3em",
        color: "#cc110eff",
        background: "#ffb9b9ff",
        backdrop: `
          rgba(66, 0, 0, 0.4)
          left top
          no-repeat
        `,
      });
      this.marcarCamposComoInvalidos();
      return;
    }

    try {
      const item: ItemPlanilha = {
        id: this.itemParaEditar?.id ?? '', // ID vazio para novos itens
        ...this.form.value
      };

      // SALVA NO BANCO (Firestore)
      const itemSalvo = await this.planilhaService.salvar(item);

      // Emite para o componente pai
      this.salvarItem.emit(itemSalvo);

      // Limpa o formulário
      this.form.reset({ 
        nome: '',
        precoProduto: 0,
        produtoPago: false,
        freteInternacional: 0,
        freteInternacionalPago: false,
        freteNacional: 0,
        freteNacionalPago: false,
        statusEnvio: 'Não enviado'
      });

      this.itemParaEditar = null;

    } catch (error) {
      Swal.fire({
        title: "Erro ao salvar item.",
        width: 600,
        padding: "3em",
        color: "#cc110eff",
        background: "#ffb9b9ff",
        backdrop: `
          rgba(66, 0, 0, 0.4)
          left top
          no-repeat
        `,
      });
    }
  }

  private marcarCamposComoInvalidos() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  get textoBotao(): string {
    return this.itemParaEditar ? 'Atualizar' : 'Salvar';
  }
}
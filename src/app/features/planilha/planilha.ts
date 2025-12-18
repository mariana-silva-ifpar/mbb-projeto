import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormItemComponent, ItemPlanilha } from './form-item/form-item';
import { TabelaItensComponent } from './tabela-itens/tabela-itens';
import { Router } from '@angular/router';
import { PlanilhaService } from '../../services/planilha-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-planilha',
  standalone: true,
  imports: [CommonModule, FormItemComponent, TabelaItensComponent],
  templateUrl: './planilha.html',
  styleUrls: ['./planilha.css']
})
export class PlanilhaComponent implements OnInit {

  constructor(
    private router: Router,
    private planilhaService: PlanilhaService
  ) {}

  itens: ItemPlanilha[] = [];
  itemParaEditar: ItemPlanilha | null = null;

  async ngOnInit() {
    await this.carregarItens();
  }

  async carregarItens() {
    try {
      this.itens = await this.planilhaService.obterTodos();
    } catch (error) {

    }
  }

  async salvarItem(item: ItemPlanilha) {
    try {
      // O item já foi salvo no banco pelo FormItemComponent
      // Atualizamos apenas a lista local
      const index = this.itens.findIndex(i => i.id === item.id);

      if (index >= 0) {
        // Atualiza item existente
        this.itens[index] = item;
      } else {
        // Adiciona novo item
        this.itens = [item, ...this.itens];
      }

      this.itemParaEditar = null;
    } catch (error) {
      
    }
  }

  editarItem(item: ItemPlanilha) {
    this.itemParaEditar = item;
  }

  async excluirItem(item: ItemPlanilha) {
    Swal.fire({
          title: "Deseja apagar item '" + item.nome + "'?",
          width: 600,
          padding: "3em",
          color: "#cc110eff",
          background: "#ffb9b9ff",
          backdrop: `
            rgba(66, 0, 0, 0.4)
            left top
            no-repeat
          `,
          showDenyButton: true,
          denyButtonText: 'Não',
          confirmButtonText: `Sim`,
        }).then(async (result) => {
            if (result.isConfirmed) {
              await this.planilhaService.excluir(item.id);
              Swal.fire({
                title: 'Item excluído com sucesso!',
                color: "#e99392",
                background: "#f5e2e2ff",
                icon: 'success',
                confirmButtonText: 'OK'
              });
              // Remove da lista local
              this.itens = this.itens.filter(i => i.id !== item.id);

            }
        });
        }

  goBackToMenu() {
    this.router.navigate(['/inicio']);
  }
}
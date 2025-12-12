import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-item.html',
  styleUrls: ['./form-item.css']
})
export class FormItemComponent implements OnInit {

  @Input() itemParaEditar: any = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      categoria: ['', Validators.required],
    });

    if (this.itemParaEditar) {
      this.form.patchValue(this.itemParaEditar);
    }
  }

  salvar() {
    console.log(this.form.value);
  }
}

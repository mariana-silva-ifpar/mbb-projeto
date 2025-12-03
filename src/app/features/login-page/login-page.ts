import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit(){
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  goToRegister(){

  }

}

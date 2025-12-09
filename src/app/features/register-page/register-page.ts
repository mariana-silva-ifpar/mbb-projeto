import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  constructor(private router: Router){}

  private fb = inject(FormBuilder);
  private service = inject(AuthService);

  form!: FormGroup;

  ngOnInit(){
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]]

    })
  }

  goToLoginPage(){
    this.router.navigate(['/login'])
  }

  async onSubmit(){
    if(this.form.invalid) return;

    try {
      await this.service.register(this.form.value);
      console.log("Cadastro concluído!")
      this.form.reset();
      this.goToLoginPage();
    } catch(err){
      console.log("Erro ao cadastrar", err)
    }
  }

}

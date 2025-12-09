import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  constructor(private router: Router){}

  private fb = inject(FormBuilder);
  private service = inject(AuthService);

  form!: FormGroup;

  ngOnInit(){
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  goToRegister(){
    this.router.navigate(['/cadastro']);
  }

  async OnSubmit(){
    const {username, password} = this.form.value;

    try{
      await this.service.login(username, password);
      console.log('Login realizado.')
    } catch(err){
      console.error(err);
    }

    this.router.navigate(['/inicio']);
  }

}

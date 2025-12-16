import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

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
      Swal.fire({
        title: "Sucesso ao realizar login.",
        width: 600,
        padding: "3em",
        color: "#e99392",
        background: "#f5e2e2ff",
        backdrop: `
          rgba(0,0,123,0.4)
          left top
          no-repeat
        `
      });
      this.router.navigate(['/inicio']);
    } catch(err){
      Swal.fire({
        title: "Erro ao realizar o login.",
        width: 600,
        padding: "3em",
        color: "#cc110eff",
        background: "#ffb9b9ff",
        backdrop: `
          rgba(66, 0, 0, 0.4)
          left top
          no-repeat
        `
      });
    }

  }

}

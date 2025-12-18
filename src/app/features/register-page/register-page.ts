import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

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

  formInvalid(): boolean {
    const senha = this.form.get('password')?.value;
    const confirmarSenha = this.form.get('confirmPassword')?.value;

    return !!(senha && confirmarSenha && senha !== confirmarSenha);
  }



  async onSubmit(){
    if(this.formInvalid()) return;

    try {
      await this.service.register(this.form.value);
      Swal.fire({
              title: "Sucesso ao realizar cadastro.",
              width: 600,
              padding: "3em",
              color: "#e99392",
              background: "#f5e2e2ff",
              backdrop: `
                rgba(68, 68, 126, 0.4)
                left top
                no-repeat
              `
            });
      this.form.reset();
      this.goToLoginPage();
    } catch(err: any){
      if(err.message === 'Este nome de usuário já está em uso'){
        Swal.fire({
          title: "Nome de usuário já existente.",
          width: 600,
          padding: "3em",
          color: "#cc110eff",
          background: "#ffb9b9ff",
          backdrop: `
            rgba(66, 0, 0, 0.4)
            left top
            no-repeat
          `,
        })
      } else if(err.message = 'Esse e-mail já está em uso') {
          Swal.fire({
            title: "E-mail já cadastrado.",
            width: 600,
            padding: "3em",
            color: "#cc110eff",
            background: "#ffb9b9ff",
            backdrop: `
              rgba(66, 0, 0, 0.4)
              left top
              no-repeat
            `,
          })
      } else {
          Swal.fire({
            title: "Erro ao realizar cadastro.",
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
            denyButtonText: `Voltar para o login`,
          }).then((result) => {
              if (result.isDenied) {
              Swal.fire("Cadastro não realizado.");
              this.goToLoginPage();
              
            }
          });
      }
    }
  }

}

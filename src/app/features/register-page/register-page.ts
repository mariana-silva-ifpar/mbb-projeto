import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  constructor(private router: Router){}

  private fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit(){
    this.form = this.fb.group({
      name: [null, Validators.required],
      birthDate: [null],
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]]

    })
  }

  goToLoginPage(){
    this.router.navigate(['/login'])
  }

}

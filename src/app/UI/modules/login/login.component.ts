import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginUseCase } from 'src/app/domain/usecase/loginusercase';
import { Login } from 'src/app/domain/models/login/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  showPassword = false;
  loginForm!: FormGroup;
  errorCredentials: boolean = false;

  constructor(private readonly _loginUsecase: LoginUseCase) {
    localStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return new FormGroup({
      document: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    const login = this.loginForm.value as Login;
    this._loginUsecase.loginUser(login);
  }
}

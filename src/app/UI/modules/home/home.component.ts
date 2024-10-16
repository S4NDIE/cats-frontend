import { Component } from '@angular/core';
import { User } from 'src/app/domain/models/user/user';
import { LoginUseCase } from 'src/app/domain/usecase/loginusercase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  userLogin!: User;

  constructor(private readonly _loginusercase: LoginUseCase) {
    this.userLogin = JSON.parse(localStorage.getItem('infoUser')!);
  }

  validateToken() {
    this._loginusercase.validateToken();
  }
}

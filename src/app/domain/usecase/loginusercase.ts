import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LoginGateway } from '../models/login/gateway/login-gateway';
import { Login } from '../models/login/login';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as loginActions from 'src/app/reducers/login.actions';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  constructor(
    private readonly _loginGateway: LoginGateway,
    private readonly _router: Router,
    private readonly _store: Store<AppState>
  ) {}

  async loginUser(login: Login) {
    const loginResponse = await lastValueFrom(this._loginGateway.login(login));
    localStorage.setItem('infoUser', JSON.stringify(loginResponse));
    localStorage.setItem(environment.tokenName, loginResponse.token);
    this._store.dispatch(loginActions.setToken({ token: loginResponse.token }));
    this._router.navigateByUrl('/home');
  }

  logout() {
    localStorage.clear();
    this._router.navigateByUrl('/login');
  }

  async validateToken() {
    await lastValueFrom(this._loginGateway.validateToken());
  }
}

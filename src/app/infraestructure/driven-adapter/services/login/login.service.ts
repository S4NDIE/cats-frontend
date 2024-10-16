import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginGateway } from '../../../../domain/models/login/gateway/login-gateway';
import { Login } from '../../../../domain/models/login/login';
import { environment } from 'src/environments/environment';
import { ServicioBaseService } from 'src/app/infraestructure/helpers/servicio-base.service';
import { User } from 'src/app/domain/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends LoginGateway {
  private _urlApi: string = `${environment.apiUrl}user/login`;
  constructor(private readonly genericService: ServicioBaseService<any>) {
    super();
  }

  login(login: Login): Observable<User> {
    return this.genericService.post(this._urlApi, login, false);
  }
  validateToken(): Observable<any> {
    return this.genericService.get(`${environment.apiUrl}user/validate`, true);
  }
}

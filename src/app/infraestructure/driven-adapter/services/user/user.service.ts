import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicioBaseService } from 'src/app/infraestructure/helpers/servicio-base.service';
import { User } from 'src/app/domain/models/user/user';
import { UserGateway } from 'src/app/domain/models/user/gateway/user-gateway';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserGateway {
  private readonly _urlApi: string = `${environment.apiUrl}user`;
  constructor(private readonly genericService: ServicioBaseService<any>) {
    super();
  }

  getAllUsers(): Observable<User[]> {
    return this.genericService.get(this._urlApi, true);
  }
  saveUser(user: User): Observable<User> {
    return this.genericService.post(this._urlApi, user, true);
  }
  deleteUser(document: string): Observable<User> {
    return this.genericService.get(`${this._urlApi}/delete/${document}`, true);
  }
}

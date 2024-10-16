import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UserGateway } from '../models/user/gateway/user-gateway';
import { User } from '../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserUseCase {
  constructor(private readonly _userGateway: UserGateway) {}

  async getAllUsers() {
    return await lastValueFrom(this._userGateway.getAllUsers());
  }

  async saveUser(user: User) {
    return await lastValueFrom(this._userGateway.saveUser(user));
  }

  async deleteUser(document: string) {
    return await lastValueFrom(this._userGateway.deleteUser(document));
  }
}

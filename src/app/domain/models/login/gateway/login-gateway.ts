import { Observable } from 'rxjs';
import { Login } from '../login';
import { User } from '../../user/user';

export abstract class LoginGateway {
  abstract login(login: Login): Observable<User>;
  abstract validateToken(): Observable<any>;
}

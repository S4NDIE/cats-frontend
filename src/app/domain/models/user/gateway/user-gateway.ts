import { Observable } from 'rxjs';
import { User } from '../user';

export abstract class UserGateway {
  abstract getAllUsers(): Observable<User[]>;
  abstract saveUser(user: User): Observable<User>;
  abstract deleteUser(document: string): Observable<User>;
}

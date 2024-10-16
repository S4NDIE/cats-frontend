import { TestBed } from '@angular/core/testing';
import { LoginUseCase } from './loginusercase';
import { LoginGateway } from '../models/login/gateway/login-gateway';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Login } from '../models/login/login';
import * as loginActions from 'src/app/reducers/login.actions';
import { AppState } from 'src/app/app.reducer';
import { User } from '../models/user/user';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let loginGatewayMock: jasmine.SpyObj<LoginGateway>;
  let routerMock: jasmine.SpyObj<Router>;
  let storeMock: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    loginGatewayMock = jasmine.createSpyObj('LoginGateway', [
      'login',
      'validateToken',
    ]);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        LoginUseCase,
        { provide: LoginGateway, useValue: loginGatewayMock },
        { provide: Router, useValue: routerMock },
        { provide: Store, useValue: storeMock },
      ],
    });

    loginUseCase = TestBed.inject(LoginUseCase);
  });

  it('should login user and store token', async () => {
    const mockLogin: Login = { document: '123', password: 'password' };
    const mockResponse: User = {
      document: '123',
      email: 'test',
      fullName: 'test',
      password: 'tes',
      token: 'test',
    };

    loginGatewayMock.login.and.returnValue(of(mockResponse));

    await loginUseCase.loginUser(mockLogin);

    expect(localStorage.getItem('infoUser')).toEqual(
      JSON.stringify(mockResponse)
    );
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should logout user and clear localStorage', () => {
    loginUseCase.logout();

    expect(localStorage.getItem('infoUser')).toBeNull();
    expect(localStorage.getItem('tokenName')).toBeNull();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should validate token', async () => {
    loginGatewayMock.validateToken.and.returnValue(of({}));

    await loginUseCase.validateToken();

    expect(loginGatewayMock.validateToken).toHaveBeenCalled();
  });
});

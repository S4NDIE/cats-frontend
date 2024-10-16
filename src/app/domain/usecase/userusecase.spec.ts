import { TestBed } from '@angular/core/testing';
import { UserUseCase } from './userusecase';
import { UserGateway } from '../models/user/gateway/user-gateway';
import { User } from '../models/user/user';
import { of } from 'rxjs';

describe('UserUseCase', () => {
  let userUseCase: UserUseCase;
  let userGatewayMock: jasmine.SpyObj<UserGateway>;

  beforeEach(() => {
    userGatewayMock = jasmine.createSpyObj('UserGateway', [
      'getAllUsers',
      'saveUser',
      'deleteUser',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserUseCase,
        { provide: UserGateway, useValue: userGatewayMock },
      ],
    });

    userUseCase = TestBed.inject(UserUseCase);
  });

  it('should get all users', async () => {
    const mockUsers: User[] = [
      {
        document: '123',
        email: 'test',
        fullName: 'test',
        password: 'tes',
        token: 'test',
      },
    ];

    userGatewayMock.getAllUsers.and.returnValue(of(mockUsers));

    const users = await userUseCase.getAllUsers();

    expect(users).toEqual(mockUsers);
    expect(userGatewayMock.getAllUsers).toHaveBeenCalled();
  });

  it('should save a user', async () => {
    const mockUser: User = {
      document: '123',
      email: 'test',
      fullName: 'test',
      password: 'tes',
      token: 'test',
    };

    userGatewayMock.saveUser.and.returnValue(of(mockUser));

    const savedUser = await userUseCase.saveUser(mockUser);

    expect(savedUser).toEqual(mockUser);
    expect(userGatewayMock.saveUser).toHaveBeenCalledWith(mockUser);
  });

  it('should delete a user', async () => {
    const document = '123';
    const mockUser: User = {
      document: '123',
      email: 'test',
      fullName: 'test',
      password: 'tes',
      token: 'test',
    };
    userGatewayMock.deleteUser.and.returnValue(of(mockUser));

    await userUseCase.deleteUser(document);

    expect(userGatewayMock.deleteUser).toHaveBeenCalledWith(document);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { LoginUseCase } from 'src/app/domain/usecase/loginusercase';
import { User } from 'src/app/domain/models/user/user';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let loginUseCaseMock: jasmine.SpyObj<LoginUseCase>;

  beforeEach(async () => {
    loginUseCaseMock = jasmine.createSpyObj('LoginUseCase', ['validateToken']);

    const userMock: User = {
      document: '1234',
      email: 'test',
      fullName: 'test',
      password: 'test',
      token: 'test',
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(userMock));

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: LoginUseCase, useValue: loginUseCaseMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load user from localStorage on init', () => {
    expect(component.userLogin).toEqual(jasmine.any(Object));
    expect(component.userLogin).toEqual(
      JSON.parse(localStorage.getItem('infoUser')!)
    );
  });

  it('should call validateToken when called', () => {
    component.validateToken();
    expect(loginUseCaseMock.validateToken).toHaveBeenCalled();
  });
});

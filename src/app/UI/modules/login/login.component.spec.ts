import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginUseCase } from 'src/app/domain/usecase/loginusercase';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginUseCaseMock: jasmine.SpyObj<LoginUseCase>;

  beforeEach(async () => {
    loginUseCaseMock = jasmine.createSpyObj('LoginUseCase', ['loginUser']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent],
      providers: [{ provide: LoginUseCase, useValue: loginUseCaseMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['document'].value).toBe('');
    expect(component.loginForm.controls['password'].value).toBe('');
  });

  it('should toggle password visibility', () => {
    component.toggleShowPassword();
    expect(component.showPassword).toBeTrue();
    component.toggleShowPassword();
    expect(component.showPassword).toBeFalse();
  });

  it('should validate form controls', () => {
    component.ngOnInit();
    const documentControl = component.loginForm.controls['document'];
    const passwordControl = component.loginForm.controls['password'];

    expect(documentControl.valid).toBeFalse();
    expect(passwordControl.valid).toBeFalse();

    documentControl.setValue('12');
    passwordControl.setValue('12345');

    expect(documentControl.valid).toBeTrue();
    expect(passwordControl.valid).toBeTrue();
  });

  it('should call loginUser on submit', async () => {
    component.ngOnInit();
    component.loginForm.controls['document'].setValue('123456');
    component.loginForm.controls['password'].setValue('password123');

    await component.onSubmit();

    expect(loginUseCaseMock.loginUser).toHaveBeenCalledWith({
      document: '123456',
      password: 'password123',
    });
  });
});

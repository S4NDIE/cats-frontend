import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserUseCase } from 'src/app/domain/usecase/userusecase';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { User } from 'src/app/domain/models/user/user';
import { UserFormComponent } from './user-form.component';
import { AngularMaterialModule } from 'src/app/UI/shared/angular-material/angular-material.module';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userUseCaseMock: jasmine.SpyObj<UserUseCase>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let dialogRefMock: jasmine.SpyObj<MatDialogRef<UserFormComponent>>;

  beforeEach(async () => {
    userUseCaseMock = jasmine.createSpyObj('UserUseCase', ['saveUser']);
    toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success']);
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AngularMaterialModule],
      declarations: [UserFormComponent],
      providers: [
        { provide: UserUseCase, useValue: userUseCaseMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 4 controls', () => {
    expect(component.userForm.contains('document')).toBeTrue();
    expect(component.userForm.contains('fullName')).toBeTrue();
    expect(component.userForm.contains('email')).toBeTrue();
    expect(component.userForm.contains('password')).toBeTrue();
  });

  it('should make the document control required', () => {
    const control = component.userForm.get('document');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('should call saveUser and close the modal on submit', async () => {
    const user: User = {
      document: '12345',
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      token: '',
    };

    const user1 = {
      document: '12345',
      fullName: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    component.userForm.setValue(user1);
    userUseCaseMock.saveUser.and.returnValue(Promise.resolve(user));

    await component.onSubmit();

    expect(toastrServiceMock.success).toHaveBeenCalledWith('Usuario creado');
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should close the modal with a response', () => {
    component.closeModal(false);
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});

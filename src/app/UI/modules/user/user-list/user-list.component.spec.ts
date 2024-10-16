import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserUseCase } from 'src/app/domain/usecase/userusecase';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let mockUserUseCase: any;
  let mockDialog: any;
  let mockToastrService: any;

  beforeEach(async () => {
    mockUserUseCase = {
      getAllUsers: jasmine
        .createSpy('getAllUsers')
        .and.returnValue(Promise.resolve([])),
      deleteUser: jasmine
        .createSpy('deleteUser')
        .and.returnValue(Promise.resolve()),
    };

    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    };

    mockToastrService = {
      success: jasmine.createSpy('success'),
    };

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        { provide: UserUseCase, useValue: mockUserUseCase },
        { provide: MatDialog, useValue: mockDialog },
        { provide: ToastrService, useValue: mockToastrService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize columnsUser on ngOnInit', () => {
    component.ngOnInit();
    expect(component.columnsUser.length).toBeGreaterThan(0);
    expect(component.columnsUser).toContain(
      jasmine.objectContaining({ name: 'Documento' })
    );
  });

  it('should get users on ngOnInit', async () => {
    mockUserUseCase.getAllUsers.and.returnValue(
      Promise.resolve([
        { document: '123', fullName: 'Test User', email: 'test@example.com' },
      ])
    );
    await component.ngOnInit();
    expect(mockUserUseCase.getAllUsers).toHaveBeenCalled();
    expect(component.userList.length).toBe(1);
  });

  it('should open dialog and reload users on createCustomer', () => {
    component.createCustomer();
    expect(mockDialog.open).toHaveBeenCalledWith(UserFormComponent, {
      disableClose: true,
      width: '90%',
      maxHeight: '90%',
    });
  });

  it('should refresh users after dialog closes', async () => {
    mockUserUseCase.getAllUsers.and.returnValue(
      Promise.resolve([
        { document: '123', fullName: 'Test User', email: 'test@example.com' },
      ])
    );
    await component.createCustomer();
    expect(mockUserUseCase.getAllUsers).toHaveBeenCalled();
  });
  it('should delete user and show success message', async () => {
    const documentMock = '12345';
    mockUserUseCase.deleteUser.and.returnValue(Promise.resolve());

    await component.deleteUserConfirm(documentMock);

    expect(mockUserUseCase.deleteUser).toHaveBeenCalledWith(documentMock);
  });

  it('should call deleteUserConfirm when user confirms deletion', async () => {
    const documentMock = '12345';
    const deleteUserConfirmSpy = spyOn(
      component,
      'deleteUserConfirm'
    ).and.callThrough();

    const swalResult: SweetAlertResult = {
      isConfirmed: true,
      isDenied: false,
      isDismissed: false,
    };
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(swalResult));

    await component.deleteUser(documentMock);

    expect(deleteUserConfirmSpy).toHaveBeenCalledWith(documentMock);
  });

  it('should not call deleteUserConfirm when user cancels deletion', async () => {
    const documentMock = '12345';
    const deleteUserConfirmSpy = spyOn(component, 'deleteUserConfirm');

    const swalResult: SweetAlertResult = {
      isConfirmed: false,
      isDenied: false,
      isDismissed: false,
    };
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve(swalResult));

    await component.deleteUser(documentMock);

    expect(deleteUserConfirmSpy).not.toHaveBeenCalled();
  });
});

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/domain/models/user/user';
import { UserUseCase } from 'src/app/domain/usecase/userusecase';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  isEdit: boolean = false;
  userForm: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _userUsecase: UserUseCase,
    private readonly _toastrService: ToastrService,
    public _dialogRef: MatDialogRef<UserFormComponent>
  ) {
    this.userForm = this.createForm();
  }
  createForm() {
    return this._fb.group({
      document: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit() {
    const user = this.userForm.value as User;
    await this._userUsecase.saveUser(user);
    this._toastrService.success('Usuario creado');
    this.closeModal(true);
  }
  closeModal(respuesta: any): void {
    this.userForm.reset();
    this._dialogRef.close(respuesta);
  }
}

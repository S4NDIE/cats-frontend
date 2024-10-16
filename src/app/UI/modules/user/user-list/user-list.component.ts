import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { User } from 'src/app/domain/models/user/user';
import { UserUseCase } from 'src/app/domain/usecase/userusecase';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;

  columnMode = ColumnMode;
  columnsUser: any = [];
  userList: User[] = [];
  ColumnMode = ColumnMode;
  messageTable = {
    emptyMessage: 'No hay registros para mostrar',
  };
  userLogin!: User;

  constructor(
    public _dialog: MatDialog,
    public readonly _userUsecase: UserUseCase,
    private readonly _toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.userLogin = JSON.parse(localStorage.getItem('infoUser')!);
    this.columnsUser = [
      { prop: 'document', name: 'Documento' },
      { prop: 'fullName', name: 'Nombre' },
      { prop: 'email', name: 'Correo' },
      { cellTemplate: this.actionTemplate, name: 'Acciones', prop: 'actions' },
    ];
    this.getUsers();
  }

  async getUsers() {
    this.userList = await this._userUsecase.getAllUsers();
  }

  deleteUser(document: string) {
    if (document != this.userLogin.document) {
      Swal.fire({
        title: `¿Desea eliminar el usuario con el documento ${document}?`,
        text: 'No podrá revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
          cancelButton: 'btn-alert btn-alert-secondary',
          confirmButton: 'btn-alert btn-alert-main',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteUserConfirm(document);
        }
      });
    } else {
      Swal.fire({
        title: 'No puedes eliminar tu mismo usuario',
        icon: 'warning',
      });
    }
  }

  async deleteUserConfirm(document: string) {
    await this._userUsecase.deleteUser(document);
    this._toastrService.success('Usuario eliminado');
    this.getUsers();
  }

  createCustomer(): void {
    const dialogRef = this._dialog.open(UserFormComponent, {
      disableClose: true,
      width: '90%',
      maxHeight: '90%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }
}

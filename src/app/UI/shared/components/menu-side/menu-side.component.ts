import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { getDataFromJSON } from '../../../../utilities/fetch';
import { Menu } from '../../../../domain/models/menu/menu';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/domain/models/user/user';
import { LoginUseCase } from 'src/app/domain/usecase/loginusercase';

@Component({
  selector: 'app-menu-side',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-side.component.html',
  styleUrl: './menu-side.component.scss',
})
export class MenuSideComponent implements OnInit {
  @Output() onCerrarMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  classesMenuHijo: string[] = ['ocultarSubMenu'];
  clasesMenuPadre: string[] = ['menu__first-level', 'menu-level'];
  clasesMainMenu: string[] = [];
  tituloSubMenu: string | undefined;
  usuarioMenu: any[] = [];
  userLogin!: User;

  constructor(
    private readonly router: Router,
    private readonly _loginUsercase: LoginUseCase
  ) {
    getDataFromJSON<Menu[]>('assets/data/menu.json').then(
      (data) => (this.usuarioMenu = data)
    );
  }

  ngOnInit() {
    this.userLogin = JSON.parse(localStorage.getItem('infoUser')!);
    let resultado_menu = this.usuarioMenu.filter((menu) => {
      let encontroHijo = false;
      menu.menuPadre.menuHijos.filter((hijo: { url: string }) => {
        if (hijo.url.toString() == this.router.url.toString().substring(1)) {
          encontroHijo = true;
          return menu;
        }
      });
      if (encontroHijo) {
        return menu;
      }
    });
    if (resultado_menu.length > 0) {
      this.mostrarHijos(null, resultado_menu[0].menuPadre);
    }
  }

  tieneHijos(usuarioMenu: any) {
    return usuarioMenu.menuHijos?.length > 0;
  }

  mostrarHijos(event: any, usuarioMenu: any) {
    event?.preventDefault();
    this.usuarioMenu.forEach((x) => {
      x.menuPadre.visibleHijos = false;
      x.menuPadre.clases = [];
    });

    let menuSeleccionado = this.usuarioMenu.filter(
      (x) => x.menuPadre.id == usuarioMenu.id
    )[0];
    menuSeleccionado.menuPadre.visibleHijos = true;
    menuSeleccionado.menuPadre.clases.push('active');
    this.tituloSubMenu = usuarioMenu.nombre;
  }

  cerrarMenu(): void {
    this.onCerrarMenu.emit(true);
  }

  cerrarSesion(): void {
    this._loginUsercase.logout();
  }
}

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

  classMenuChildren: string[] = ['ocultarSubMenu'];
  classMenuParent: string[] = ['menu__first-level', 'menu-level'];
  classMainMenu: string[] = [];
  titleSubMenu: string | undefined;
  userMenu: any[] = [];
  userLogin!: User;

  constructor(
    private readonly router: Router,
    private readonly _loginUsercase: LoginUseCase
  ) {
    getDataFromJSON<Menu[]>('assets/data/menu.json').then(
      (data) => (this.userMenu = data)
    );
  }

  ngOnInit() {
    this.userLogin = JSON.parse(localStorage.getItem('infoUser')!);
    let resultMenu = this.userMenu.filter((menu) => {
      let hasChildren = false;
      menu.menuPadre.menuHijos.filter((hijo: { url: string }) => {
        if (hijo.url.toString() == this.router.url.toString().substring(1)) {
          hasChildren = true;
          return menu;
        }
      });
      if (hasChildren) {
        return menu;
      }
    });
    if (resultMenu.length > 0) {
      this.showChlindren(null, resultMenu[0].menuPadre);
    }
  }

  hasChildren(usuarioMenu: any) {
    return usuarioMenu.menuHijos?.length > 0;
  }

  showChlindren(event: any, usuarioMenu: any) {
    event?.preventDefault();
    this.userMenu.forEach((x) => {
      x.menuPadre.visibleHijos = false;
      x.menuPadre.clases = [];
    });

    let menuSeleccionado = this.userMenu.filter(
      (x) => x.menuPadre.id == usuarioMenu.id
    )[0];
    menuSeleccionado.menuPadre.visibleHijos = true;
    menuSeleccionado.menuPadre.clases.push('active');
    this.titleSubMenu = usuarioMenu.nombre;
  }

  closeMenu(): void {
    this.onCerrarMenu.emit(true);
  }

  closeSesion(): void {
    this._loginUsercase.logout();
  }
}

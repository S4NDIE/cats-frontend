export interface Menu {
  menuPadre: MenuPadre;
}

export interface MenuPadre {
  id: number;
  nombre: string;
  name: string;
  url: string;
  icono: string;
  visibleHijos: boolean;
  clases: any[];
  menuHijos: MenuHijo[];
}

export interface MenuHijo {
  nombre: string;
  url: string;
  clases: any[];
}

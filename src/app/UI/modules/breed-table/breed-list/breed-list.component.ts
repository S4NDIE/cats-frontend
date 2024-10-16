import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Breed } from 'src/app/domain/models/breed/breed';
import { BreedUseCase } from 'src/app/domain/usecase/breedusecase';

@Component({
  selector: 'breed-list',
  templateUrl: './breed-list.component.html',
  styleUrl: './breed-list.component.scss',
})
export class BreedTableListComponent implements OnInit {
  @ViewChild('myTable', { static: true }) table: any;
  @ViewChild('rowexpand', { static: true }) rowexpand!: TemplateRef<any>;

  columnsBreed: any = [];
  breedsList: Breed[] = [];

  messageTable = {
    emptyMessage: 'No hay registros para mostrar',
  };
  ColumnMode = ColumnMode;

  filterBreed: string = '';

  constructor(private readonly _breedUsecase: BreedUseCase) {}

  ngOnInit() {
    this.columnsBreed = [
      {
        width: 50,
        cellTemplate: this.rowexpand,
        resizeable: false,
        sortable: false,
        draggable: false,
        canAutoResize: false,
        prop: 'actions',
        name: '',
      },
      { prop: 'name', name: 'Nombre' },
      { prop: 'origin', name: 'Origen' },
      { prop: 'life_span', name: 'Esperanza de Vida' },
      { prop: 'intelligence', name: 'Inteligencia' },
      { prop: 'affection_level', name: 'Nivel De Afecto' },
      { prop: 'weight.imperial', name: 'Peso (Imperial)' },
    ];
    this.getBreedsFilter();
  }

  async getBreedsFilter() {
    this.breedsList = await this._breedUsecase.getBreedBySearch(
      this.filterBreed
    );
  }

  toggleExpandRow(row: any) {
    this.collapseAllRow();
    this.table.rowDetail.toggleExpandRow(row);
  }

  collapseAllRow() {
    this.table.rowDetail.collapseAllRows();
  }
}

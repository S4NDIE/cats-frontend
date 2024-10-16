import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BreedTableListComponent } from './breed-list/breed-list.component';
import { BreedTableRoutingModule } from './breed-table-routing.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';

@NgModule({
  declarations: [BreedTableListComponent],
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    FormsModule,
    CommonModule,
    BreedTableRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    AngularMaterialModule,
  ],
})
export class BreedTableModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedTableListComponent } from './breed-list/breed-list.component';

const routes: Routes = [
  {
    path: '',
    component: BreedTableListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreedTableRoutingModule {}

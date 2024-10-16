import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedContainerComponent } from './breed-container/breed-container.component';

const routes: Routes = [
  {
    path: '',
    component: BreedContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreedInfoRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from './services/loading.service';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent
  ],
  providers: [
    LoadingService
  ]
})
export class AppLoadingModule {
}

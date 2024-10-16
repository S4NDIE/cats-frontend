import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreedContainerComponent } from './breed-container/breed-container.component';
import { BreedInfoRoutingModule } from './breed-info-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material/angular-material.module';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { BreedInformationComponent } from './breed-information/breed-information.component';

@NgModule({
  declarations: [
    BreedContainerComponent,
    ImageCarouselComponent,
    BreedInformationComponent,
  ],
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [
    FormsModule,
    CommonModule,
    BreedInfoRoutingModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
})
export class BreedInfoModule {}

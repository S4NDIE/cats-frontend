import { Component, Input } from '@angular/core';
import { Breed } from 'src/app/domain/models/breed/breed';

@Component({
  selector: 'breed-information',
  templateUrl: './breed-information.component.html',
  styleUrl: './breed-information.component.scss',
})
export class BreedInformationComponent {
  @Input() breed!: Breed | null;
}

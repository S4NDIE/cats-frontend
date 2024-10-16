import { Component, OnInit } from '@angular/core';
import { Breed } from 'src/app/domain/models/breed/breed';
import { ImageBreed } from 'src/app/domain/models/breed/image-breed';
import { BreedUseCase } from 'src/app/domain/usecase/breedusecase';

@Component({
  selector: 'breed-container',
  templateUrl: './breed-container.component.html',
  styleUrl: './breed-container.component.scss',
})
export class BreedContainerComponent implements OnInit {
  breedsList: Breed[] = [];
  imagesBreed: ImageBreed[] = [];

  breedSelected!: Breed;
  constructor(private readonly _breedUsecase: BreedUseCase) {}

  ngOnInit() {
    this.getBreeds();
  }

  async getBreeds() {
    const responseBreeds = await this._breedUsecase.getAllBreeds();
    this.breedsList = responseBreeds;
    this.breedSelected = this.breedsList[0];
    this.getImageBreed();
  }

  async getImageBreed() {
    const responseImage = await this._breedUsecase.getImageBreeds(
      this.breedSelected.id
    );
    this.imagesBreed = responseImage;
  }
}

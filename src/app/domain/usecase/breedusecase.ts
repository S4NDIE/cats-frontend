import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BreedGateway } from '../models/breed/gateway/breed-gateway';

@Injectable({
  providedIn: 'root',
})
export class BreedUseCase {
  constructor(private readonly _breedGateway: BreedGateway) {}

  async getAllBreeds() {
    return await lastValueFrom(this._breedGateway.getAllBreeds());
  }

  async getBreedById(filter: string) {
    return await lastValueFrom(this._breedGateway.getBreedBySearch(filter));
  }

  async getBreedBySearch(filterBreed: any) {
    return filterBreed != ''
      ? await lastValueFrom(this._breedGateway.getBreedBySearch(filterBreed))
      : await lastValueFrom(this._breedGateway.getAllBreeds());
  }

  async getImageBreeds(breedId: any) {
    return await lastValueFrom(this._breedGateway.getImageBreeds(breedId));
  }
}

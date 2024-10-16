import { Observable } from 'rxjs';
import { ImageBreed } from '../image-breed';
import { Breed } from '../breed';

export abstract class BreedGateway {
  abstract getAllBreeds(): Observable<Breed[]>;
  abstract getImageBreeds(breedId: string): Observable<ImageBreed[]>;
  abstract getBreedById(breedId: string): Observable<Breed>;
  abstract getBreedBySearch(filter: string): Observable<Breed[]>;
}

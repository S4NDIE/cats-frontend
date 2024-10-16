import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicioBaseService } from 'src/app/infraestructure/helpers/servicio-base.service';
import { BreedGateway } from 'src/app/domain/models/breed/gateway/breed-gateway';
import { Breed } from 'src/app/domain/models/breed/breed';
import { ImageBreed } from 'src/app/domain/models/breed/image-breed';

@Injectable({
  providedIn: 'root',
})
export class BreedService extends BreedGateway {
  private readonly _urlApi: string = `${environment.apiUrl}`;
  constructor(private readonly genericService: ServicioBaseService<any>) {
    super();
  }

  getAllBreeds(): Observable<Breed[]> {
    return this.genericService.get(`${this._urlApi}breed`, true);
  }
  getImageBreeds(breedId: string): Observable<ImageBreed[]> {
    return this.genericService.get(`${this._urlApi}image/${breedId}`, true);
  }
  getBreedById(breedId: string): Observable<Breed> {
    return this.genericService.get(`${this._urlApi}breed/${breedId}`, true);
  }
  getBreedBySearch(filter: string): Observable<Breed[]> {
    return this.genericService.get(
      `${this._urlApi}breed/search/${filter}`,
      true
    );
  }
}

import { TestBed } from '@angular/core/testing';
import { BreedUseCase } from './breedusecase';
import { BreedGateway } from '../models/breed/gateway/breed-gateway';
import { of } from 'rxjs';

describe('BreedUseCase', () => {
  let breedUseCase: BreedUseCase;
  let breedGatewayMock: jasmine.SpyObj<BreedGateway>;
  const mockBreeds = [
    {
      weight: {
        imperial: '60 - 80 lbs',
        metric: '27 - 36 kg',
      },
      id: '1',
      name: 'Labrador Retriever',
      cfau_rl: 'https://cfau.org/labrador-retriever',
      vetstreet_url: 'https://www.vetstreet.com/dogs/labrador-retriever',
      vcahospitals_url: 'https://vcahospitals.com/labrador-retriever',
      temperament: 'Friendly, Outgoing, Gentle',
      origin: 'Canada',
      country_codes: 'CA',
      country_code: 'CA',
      description: 'The Labrador Retriever is a large and friendly dog.',
      life_span: '10 - 12 years',
      indoor: true,
      lap: false,
      alt_names: 'Lab, Labrador',
      adaptability: 5,
      affection_level: 5,
      child_friendly: 5,
      dog_friendly: 4,
      energy_level: 5,
      grooming: 3,
      health_issues: 2,
      intelligence: 5,
      shedding_level: 4,
      social_needs: 5,
      stranger_friendly: 5,
      vocalisation: 2,
      experimental: false,
      hairless: false,
      natural: true,
      rare: false,
      rex: false,
      suppressed_tail: false,
      short_legs: false,
      wikipedia_url: 'https://en.wikipedia.org/wiki/Labrador_Retriever',
      hypoallergenic: false,
      reference_imageId: 'abc123',
    },
  ];
  beforeEach(() => {
    breedGatewayMock = jasmine.createSpyObj('BreedGateway', [
      'getAllBreeds',
      'getBreedBySearch',
      'getImageBreeds',
    ]);

    TestBed.configureTestingModule({
      providers: [
        BreedUseCase,
        { provide: BreedGateway, useValue: breedGatewayMock },
      ],
    });

    breedUseCase = TestBed.inject(BreedUseCase);
  });

  it('should retrieve all breeds', async () => {
    breedGatewayMock.getAllBreeds.and.returnValue(of(mockBreeds));

    const breeds = await breedUseCase.getAllBreeds();

    expect(breeds).toEqual(mockBreeds);
    expect(breedGatewayMock.getAllBreeds).toHaveBeenCalled();
  });

  it('should retrieve a breed by id', async () => {
    breedGatewayMock.getBreedBySearch.and.returnValue(of(mockBreeds));

    const breed = await breedUseCase.getBreedById('1');

    expect(breedGatewayMock.getBreedBySearch).toHaveBeenCalledWith('1');
  });

  it('should retrieve breeds by search filter', async () => {
    breedGatewayMock.getBreedBySearch.and.returnValue(of(mockBreeds));
    breedGatewayMock.getAllBreeds.and.returnValue(of(mockBreeds));

    const breedsWithFilter = await breedUseCase.getBreedBySearch('Labrador');
    expect(breedsWithFilter).toEqual(mockBreeds);
    expect(breedGatewayMock.getBreedBySearch).toHaveBeenCalledWith('Labrador');

    const breedsWithoutFilter = await breedUseCase.getBreedBySearch('');
    expect(breedsWithoutFilter).toEqual(mockBreeds);
    expect(breedGatewayMock.getAllBreeds).toHaveBeenCalled();
  });

  it('should retrieve images for a breed', async () => {
    const mockImages = [
      { id: 'img1', url: 'image1.jpg', height: 12, width: 12 },
    ];
    breedGatewayMock.getImageBreeds.and.returnValue(of(mockImages));

    const images = await breedUseCase.getImageBreeds('1');

    expect(images).toEqual(mockImages);
    expect(breedGatewayMock.getImageBreeds).toHaveBeenCalledWith('1');
  });
});

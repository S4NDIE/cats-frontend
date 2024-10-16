import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedContainerComponent } from './breed-container.component';
import { BreedUseCase } from 'src/app/domain/usecase/breedusecase';
import { of } from 'rxjs';
import { ImageCarouselComponent } from '../image-carousel/image-carousel.component';
import { CommonModule } from '@angular/common';
import { BreedInformationComponent } from '../breed-information/breed-information.component';

describe('BreedContainerComponent', () => {
  let component: BreedContainerComponent;
  let fixture: ComponentFixture<BreedContainerComponent>;
  let breedUseCaseMock: jasmine.SpyObj<BreedUseCase>;

  beforeEach(async () => {
    breedUseCaseMock = jasmine.createSpyObj('BreedUseCase', [
      'getAllBreeds',
      'getImageBreeds',
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [
        ImageCarouselComponent,
        BreedContainerComponent,
        BreedInformationComponent,
      ],
      providers: [{ provide: BreedUseCase, useValue: breedUseCaseMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and get breeds on ngOnInit', async () => {
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

    breedUseCaseMock.getAllBreeds.and.returnValue(Promise.resolve(mockBreeds));

    await component.ngOnInit();

    expect(component.breedsList).toEqual(mockBreeds);
    expect(component.breedSelected).toEqual(mockBreeds[0]);
    expect(breedUseCaseMock.getImageBreeds).toHaveBeenCalled();
  });

  it('should get images for the selected breed', async () => {
    const mockImages = [
      { id: 'img1', url: 'image1.jpg', height: 12, width: 12 },
    ];
    const selectedBreed = {
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
    };

    breedUseCaseMock.getAllBreeds.and.returnValue(
      Promise.resolve([selectedBreed])
    );
    breedUseCaseMock.getImageBreeds.and.returnValue(
      Promise.resolve(mockImages)
    );

    await component.getBreeds();
    await component.getImageBreed();

    expect(component.imagesBreed).toEqual(mockImages);
  });
});

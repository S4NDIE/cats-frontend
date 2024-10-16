import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedInformationComponent } from './breed-information.component';
import { Breed } from 'src/app/domain/models/breed/breed';

describe('BreedInformationComponent', () => {
  let component: BreedInformationComponent;
  let fixture: ComponentFixture<BreedInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreedInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedInformationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept breed input', () => {
    const mockBreed: Breed = {
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

    component.breed = mockBreed;
    expect(component.breed).toEqual(mockBreed);
  });

  it('should accept null breed input', () => {
    component.breed = null;
    expect(component.breed).toBeNull();
  });
});

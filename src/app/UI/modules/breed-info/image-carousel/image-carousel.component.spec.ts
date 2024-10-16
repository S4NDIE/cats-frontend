import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageCarouselComponent } from './image-carousel.component';
import { ImageBreed } from 'src/app/domain/models/breed/image-breed';
import { SimpleChanges } from '@angular/core';

describe('ImageCarouselComponent', () => {
  let component: ImageCarouselComponent;
  let fixture: ComponentFixture<ImageCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with currentIndex as 0', () => {
    expect(component.currentIndex).toBe(0);
  });

  it('should reset currentIndex to 0 on changes in imagesBreed', () => {
    const mockImages: ImageBreed[] = [
      { id: 'tes1', url: 'image1.jpg', height: 12, width: 12 },
      { id: 'test2', url: 'image2.jpg', height: 12, width: 12 },
    ];

    component.imagesBreed = mockImages;
    component.ngOnChanges({
      imagesBreed: {
        currentValue: mockImages,
        previousValue: null,
      } as SimpleChanges['imagesBreed'],
    });

    expect(component.currentIndex).toBe(0);
  });

  it('should change currentIndex when goToSlide is called', () => {
    component.currentIndex = 1;
    component.goToSlide(2);
    expect(component.currentIndex).toBe(2);
  });

  it('should handle goToSlide with index 0', () => {
    component.goToSlide(0);
    expect(component.currentIndex).toBe(0);
  });
});

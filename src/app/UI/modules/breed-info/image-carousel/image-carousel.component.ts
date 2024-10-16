import { Component, Input, SimpleChanges } from '@angular/core';
import { ImageBreed } from 'src/app/domain/models/breed/image-breed';

@Component({
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrl: './image-carousel.component.scss',
})
export class ImageCarouselComponent {
  @Input() imagesBreed!: ImageBreed[];

  currentIndex = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['imagesBreed']) {
      this.currentIndex = 0;
    }
  }
  goToSlide(index: number) {
    this.currentIndex = index;
  }
}

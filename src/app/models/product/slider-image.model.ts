export class SliderImage {
  image: string;
  thumbImage: string;
  alt: string = 'product';

  constructor(image: string) {
    this.image = image;
    this.thumbImage = image;
  }
}

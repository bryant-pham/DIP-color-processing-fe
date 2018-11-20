import { Component, OnInit } from '@angular/core';

import { ImageProcessingService } from '../services/imageprocessing.service';
import { Image } from '../models/image';
import { SelectedImageService } from '../services/selectedimage.service';

@Component({
  selector: 'image-bar',
  styleUrls: [ './imagebar.component.css' ],
  templateUrl: './imagebar.component.html'
})
export class ImageBarComponent implements OnInit {
  public image: File;
  public images: Image[] = [];
  public selectedImage: Image;

  constructor(
    private processingService: ImageProcessingService,
    private selectedImageService: SelectedImageService
  ) {}

  public ngOnInit(): void {
    this.processingService.loadImages();
    this.processingService.getImages()
      .subscribe((images: Image[]) => this.images = images);
    this.selectedImageService.getSelectedImage()
      .subscribe((image: Image) => this.selectedImage = image);
  }

  public fileSelected(image: any): void {
    this.image = image;
  }

  public submit(): void {
    this.processingService.uploadImage(this.image);
  }

  public selectImage(image: Image): void {
    this.selectedImageService.selectImage(image);
  }

  public isSelected(image: Image): boolean {
    if (this.selectedImage) {
      return image.name === this.selectedImage.name;
    }
    return false;
  }
}

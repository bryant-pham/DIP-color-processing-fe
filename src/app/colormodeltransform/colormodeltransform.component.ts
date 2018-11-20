import { Component, OnInit } from '@angular/core';

import { ImageProcessingService } from '../services/imageprocessing.service';
import { DIPResponse } from '../models/DIPResponse';
import { SelectedImageService } from '../services/selectedimage.service';
import { Image } from '../models/image';

@Component({
  selector: 'color-model_transform',
  styleUrls: [ './colormodeltransform.component.css' ],
  templateUrl: './colormodeltransform.component.html'
})
export class ColorModelTransformComponent implements OnInit {
  public modelSpace: string = 'HSI';
  public selectedImage: Image;

  constructor(
    private processingService: ImageProcessingService,
    private selectedImageService: SelectedImageService
  ) {}

  public ngOnInit(): void {
    this.selectedImageService.getSelectedImage()
      .subscribe((image: Image) => this.selectedImage = image)
  }

  public submit(): void {
    this.processingService.colorModelTransform(this.modelSpace, this.image)
      .subscribe((response: DIPResponse) => {
        console.log(response);
        this.response = response;
      });
  }
}

import { Component, OnInit } from '@angular/core';

import { ImageProcessingService } from '../services/imageprocessing.service';
import { DIPResponse } from '../models/DIPResponse';
import { SelectedImageService } from '../services/selectedimage.service';
import { Image } from '../models/image';

@Component({
  selector: 'smoothen-sharpen',
  styleUrls: [ './smoothensharpen.component.css' ],
  templateUrl: './smoothensharpen.component.html'
})
export class SmoothenSharpenComponent implements OnInit {
  public filter: string = 'gaussian';
  public selectedImage: Image;
  public result: DIPResponse;

  constructor(
    private processingService: ImageProcessingService,
    private selectedImageService: SelectedImageService
  ) {}

  public ngOnInit(): void {
    this.selectedImageService.getSelectedImage()
      .subscribe((image: Image) => this.selectedImage = image);
  }

  public submit(): void {
    this.processingService.smoothenSharpen(this.filter, this.selectedImage)
      .subscribe((response: DIPResponse) => {
        this.result = response;
      });
  }
}

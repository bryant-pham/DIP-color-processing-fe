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
  public loading = false;
  public error = false;
  public sigma: string;
  public kernelWidth: string;

  constructor(
    private processingService: ImageProcessingService,
    private selectedImageService: SelectedImageService
  ) {}

  public ngOnInit(): void {
    this.selectedImageService.getSelectedImage()
      .subscribe((image: Image) => this.selectedImage = image);
  }

  public submit(): void {
    this.loading = true;
    this.error = false;
    this.processingService.smoothenSharpen(this.filter, this.sigma, this.kernelWidth, this.selectedImage)
      .subscribe((response: DIPResponse) => {
        this.result = response;
        this.loading = false;
        this.error = false;
      },
(error: any) => {
        this.error = true;
        this.loading = false;
        setTimeout(() => {
          this.error = false;
        }, 10000);
      });
  }
}

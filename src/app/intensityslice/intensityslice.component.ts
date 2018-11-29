import { Component, OnInit } from '@angular/core';

import { ImageProcessingService } from '../services/imageprocessing.service';
import { DIPResponse } from '../models/DIPResponse';
import { Image } from '../models/image';
import { SelectedImageService } from '../services/selectedimage.service';

@Component({
  selector: 'intensity-slice',
  styleUrls: [ './intensityslice.component.css' ],
  templateUrl: './intensityslice.component.html'
})
export class IntensitySliceComponent implements OnInit {
  public image: File;
  public sliceCounter: string[] = [''];
  public sliceValues: string[] = [''];
  public sliceColors: string[] = [''];
  public loading = false;
  public result: DIPResponse;
  public selectedImage: Image;

  constructor(
    public processingService: ImageProcessingService,
    private selectedImageService: SelectedImageService
  ) {}

  public ngOnInit(): void {
    this.selectedImageService.getSelectedImage()
      .subscribe((image: Image) => this.selectedImage = image);
  }

  public addSlice(): void {
    this.sliceCounter.push('');
    this.sliceValues.push('');
    this.sliceColors.push('');
  }

  public removeSlice(): void {
    this.sliceCounter.pop();
    this.sliceValues.pop();
    this.sliceColors.pop();
  }

  public fileSelected(image: any): void {
    this.image = image;
  }

  public sliceChange(value: string, index: number): void {
    this.sliceValues[index] = value;
    console.log(this.sliceValues);
  }

  public intervalColorChange(value: string, index: number): void {
    this.sliceColors[index] = value;
    console.log(this.sliceColors);
  }

  public submit(): void {
    this.loading = true;
    this.processingService.intensitySlice(this.sliceValues, this.sliceColors, this.image)
      .subscribe((response: DIPResponse) => {
        this.result = response;
        this.loading = false;
      });
  }
}

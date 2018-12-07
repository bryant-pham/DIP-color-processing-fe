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
  public sliceCounter: number[] = [0];
  public sliceValues: number[] = [0];
  public sliceColors: string[] = [''];
  public lastSliceColor: string = '';
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
    this.sliceCounter.push(0);
    this.sliceValues.push(0);
    this.sliceColors.push(this.lastSliceColor);
    this.lastSliceColor = '';
  }

  public removeSlice(): void {
    this.sliceCounter.pop();
    this.sliceValues.pop();
    this.lastSliceColor = this.sliceColors.pop();
  }

  public sliceChange(value: string, index: number): void {
    this.sliceValues[index] = parseInt(value, 10);
    this.sliceValues.sort((x: number, y: number) => x - y);
    console.log(this.sliceValues);
  }

  public intervalColorChange(value: string, index: number): void {
    this.sliceColors[index] = value;
    console.log(this.sliceColors);
  }

  public submit(): void {
    this.loading = true;
    this.processingService
      .intensitySlice(this.sliceValues, this.sliceColors, this.lastSliceColor, this.selectedImage)
      .subscribe((response: DIPResponse) => {
        this.result = response;
        this.loading = false;
      });
  }
}

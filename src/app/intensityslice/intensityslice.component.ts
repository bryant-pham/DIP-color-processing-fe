import { Component } from '@angular/core';

import { ImageProcessingService } from '../services/imageprocessing.service';
import { DIPResponse } from '../models/DIPResponse';

@Component({
  selector: 'intensity-slice',
  styleUrls: [ './intensityslice.component.css' ],
  templateUrl: './intensityslice.component.html'
})
export class IntensitySliceComponent {
  public image: File;
  public sliceCounter: string[] = [''];
  public sliceValues: string[] = [''];
  public intervalCounter: string[] = ['', ''];
  public intervalColors: string[] = ['', ''];

  constructor(
    public processingService: ImageProcessingService
  ) {}

  public addSlice(): void {
    this.sliceCounter.push('');
    this.sliceValues.push('');
    this.intervalCounter.push('');
    this.intervalColors.push('');
  }

  public removeSlice(): void {
    this.sliceCounter.pop();
    this.sliceValues.pop();
    this.intervalCounter.pop();
    this.intervalColors.pop();
  }

  public fileSelected(image: any): void {
    this.image = image;
  }

  public sliceChange(value: string, index: number): void {
    this.sliceValues[index] = value;
    console.log(this.sliceValues);
  }

  public intervalColorChange(value: string, index: number): void {
    this.intervalColors[index] = value;
    console.log(this.intervalColors);
  }

  public submit(): void {
    this.processingService.intensitySlice(this.sliceValues, this.intervalColors, this.image)
      .subscribe((response: DIPResponse) => {
        console.log(response);
      });
  }
}

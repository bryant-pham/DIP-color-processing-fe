import { Component } from '@angular/core';

import { ImageProcessingService } from '../services/imageprocessing.service';

@Component({
  selector: 'color-model_transform',
  styleUrls: [ './colormodeltransform.component.css' ],
  templateUrl: './colormodeltransform.component.html'
})
export class ColorModelTransformComponent {
  public modelSpace: string = 'HSI';
  public image: File;

  constructor(
    public processingService: ImageProcessingService
  ) {}

  public fileSelected(image: any): void {
    this.image = image;
  }

  public submit(): void {
    this.processingService.colorModelTransform(this.modelSpace, this.image)
      .subscribe((response: Response) => {
        console.log(response);
      });
  }
}

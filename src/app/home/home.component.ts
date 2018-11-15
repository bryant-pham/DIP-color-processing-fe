import {
  Component
} from '@angular/core';

import { ImageProcessingService } from '../services/imageprocessing.service';

@Component({
  selector: 'home',  // <home></home>
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  public modelSpace: string = 'HSI';
  public image: any;

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

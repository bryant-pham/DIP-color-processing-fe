import { Component, OnInit } from '@angular/core';

import { ImageProcessingService } from '../services/imageprocessing.service';
import { DIPResponse } from '../models/DIPResponse';
import { SelectedImageService } from '../services/selectedimage.service';
import { Image } from '../models/image';
import { PhaseShift } from '../models/phaseshift';

@Component({
  selector: 'gray-to-color',
  styleUrls: [ './graytocolor.component.css' ],
  templateUrl: './graytocolor.component.html'
})
export class GrayToColorComponent implements OnInit {
  public selectedImage: Image;
  public redShift = '0';
  public greenShift = '0';
  public blueShift = '0';
  public redAmp = '1';
  public greenAmp = '1';
  public blueAmp = '1';
  public phaseShifts = {
    red: {
      shift: '0',
      amp: '1'
    },
    green: {
      shift: '0',
      amp: '1'
    },
    blue: {
      shift: '0',
      amp: '1'
    }
  };
  public result: DIPResponse;
  public loading = false;
  public error = false;

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
    this.convertInts();
    this.processingService.grayToColor(this.phaseShifts, this.selectedImage)
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

  private convertInts(): void {
    this.phaseShifts.blue.shift = parseInt(this.blueShift, 10);
    this.phaseShifts.blue.amp = parseInt(this.blueAmp, 10);
    this.phaseShifts.green.shift = parseInt(this.greenShift, 10);
    this.phaseShifts.green.amp = parseInt(this.greenAmp, 10);
    this.phaseShifts.red.shift = parseInt(this.redShift, 10);
    this.phaseShifts.red.amp = parseInt(this.redAmp, 10);
  }
}

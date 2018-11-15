import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { PhaseShift } from '../models/phaseshift';
import { DIPResponse } from '../models/DIPResponse';

const DEV_HOST = 'http://127.0.0.1:5000/';
const COLOR_MODEL_TRANSFORM_URL = DEV_HOST + 'colormodeltransform';
const INTENSITY_SLICE_URL = DEV_HOST + 'intensityslice';
const GRAY_TO_COLOR_URL = DEV_HOST + 'graytocolor';
const SMOOTHEN_SHARPEN_URL = DEV_HOST + 'smoothensharpen';

@Injectable()
export class ImageProcessingService {
  constructor(private http: HttpClient) {}

  public colorModelTransform(modelSpace: string, image: File): Observable<DIPResponse> {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('model_space', modelSpace);
    return this.http.post(COLOR_MODEL_TRANSFORM_URL, formData)
      .pipe(map((response) => new DIPResponse(response)));
  }

  public intensitySlice(slices: string[],
                        intervalColors: string[],
                        image: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('slices', this.blobify(slices));
    formData.append('interval_colors', this.blobify(intervalColors));
    return this.http.post(INTENSITY_SLICE_URL, formData)
      .pipe(map((response) => new DIPResponse(response)));
  }

  public grayToColor(phaseShifts: PhaseShift, image: File): Observable<Response> {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('phase_shifts', this.blobify(phaseShifts));
    return this.http.post(GRAY_TO_COLOR_URL, formData)
      .pipe(map((response) => new DIPResponse(response)));
  }

  public smoothenSharpen(modelSpace: string, operation: string, image: File): Observable<Response> {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('model_space', modelSpace);
    formData.append('operation', operation);
    return this.http.post(SMOOTHEN_SHARPEN_URL, formData)
      .pipe(map((response) => new DIPResponse(response)));
  }

  private blobify(obj: any): Blob {
    return new Blob([JSON.stringify(obj)], { type : 'application/json' });
  }
}

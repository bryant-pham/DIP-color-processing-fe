import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { PhaseShift } from '../models/phaseshift';
import { DIPResponse } from '../models/DIPResponse';
import { Image } from '../models/image';
import { select, Store } from '@ngrx/store';
import { SetImages } from '../reducers/actions/image.action';

const DEV_HOST = 'http://127.0.0.1:5000/';
// const DEV_HOST = 'http://192.241.234.235:5000/';
const COLOR_MODEL_TRANSFORM_URL = DEV_HOST + 'colormodeltransform';
const INTENSITY_SLICE_URL = DEV_HOST + 'intensityslice';
const GRAY_TO_COLOR_URL = DEV_HOST + 'graytocolor';
const SMOOTHEN_SHARPEN_URL = DEV_HOST + 'smoothensharpen';
const IMAGES_URL = DEV_HOST + 'images';
const IMAGE_UPLOAD_URL = DEV_HOST + 'images/upload';

@Injectable()
export class ImageProcessingService {
  constructor(private http: HttpClient,
              private store: Store<any>) {}

  public loadImages(): void {
    this.http.get(IMAGES_URL)
      .pipe(map((response) => Image.fromArray(response)))
      .subscribe((images: Image[]) => this.store.dispatch(new SetImages(images)));
  }

  public getImages(): Observable<Image[]> {
    return this.store.pipe(select('images'));
  }

  public uploadImage(imageFile: File): void {
    const formData = new FormData();
    formData.append('photo',  imageFile);
    this.http.post(IMAGE_UPLOAD_URL, formData)
      .pipe(map((response) => Image.fromArray(response)))
      .subscribe((images: Image[]) => this.store.dispatch(new SetImages(images)));
  }

  public colorModelTransform(colorSpace: string, image: Image): Observable<DIPResponse> {
    return this.http.post(COLOR_MODEL_TRANSFORM_URL,
      {color_model: colorSpace, filename: image.name})
      .pipe(map((response) => new DIPResponse(response)));
  }

  public intensitySlice(slices: string[],
                        intervalColors: string[],
                        image: File): Observable<DIPResponse> {
    const formData = new FormData();
    formData.append('photo', image);
    formData.append('slices', this.blobify(slices));
    formData.append('interval_colors', this.blobify(intervalColors));
    return this.http.post(INTENSITY_SLICE_URL, formData)
      .pipe(map((response) => new DIPResponse(response)));
  }

  public grayToColor(phaseShifts: PhaseShift, image: Image): Observable<DIPResponse> {
    return this.http.post(GRAY_TO_COLOR_URL, {phase_shifts: phaseShifts, filename: image.name})
      .pipe(map((response) => new DIPResponse(response)));
  }

  // public smoothenSharpen(modelSpace: string, operation: string, image: Image): Observable<DIPResponse> {
  //   const formData = new FormData();
  //   formData.append('photo', image);
  //   formData.append('model_space', modelSpace);
  //   formData.append('operation', operation);
  //   return this.http.post(SMOOTHEN_SHARPEN_URL, formData)
  //     .pipe(map((response) => new DIPResponse(response)));
  // }

  private blobify(obj: any): Blob {
    return new Blob([JSON.stringify(obj)], { type : 'application/json' });
  }
}

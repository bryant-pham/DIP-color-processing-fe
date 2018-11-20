import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Image } from '../models/image';
import { SelectImage } from '../reducers/actions/image.action';
import { Observable } from 'rxjs/index';

@Injectable()
export class SelectedImageService {
  constructor(private store: Store<any>) {}

  public selectImage(image: Image): void {
    this.store.dispatch(new SelectImage(image));
  }

  public getSelectedImage(): Observable<Image> {
    return this.store.pipe(select('selectedImage'));
  }
}

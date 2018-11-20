import { Action } from '@ngrx/store';
import { Image } from '../../models/image';

export enum ActionTypes {
  SET_IMAGES = '[Image Component] Set Images',
  ADD_IMAGE = '[Image Component] Add Image',
  SELECT_IMAGE = '[Image Component] Select Image',
}

export interface ActionWithPayload<T> extends Action {
  payload: T;
}

export class SetImages implements ActionWithPayload<Image[]> {
  public readonly type = ActionTypes.SET_IMAGES;

  constructor(public payload: Image[]) {}
}

export class AddImage implements ActionWithPayload<Image> {
  public readonly type = ActionTypes.ADD_IMAGE;

  constructor(public payload: Image) {}
}

export class SelectImage implements ActionWithPayload<Image> {
  public readonly type = ActionTypes.SELECT_IMAGE;

  constructor(public payload: Image) {}
}

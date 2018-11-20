import { Action } from '@ngrx/store';
import { Image } from '../../models/image';

export enum ActionTypes {
  SET_IMAGES = '[Image Component] Set Images',
  ADD_IMAGE = '[Image Component] Add Image',
  SELECT_IMAGE = '[Image Component] Select Image',
}

export class SetImages implements Action {
  public readonly type = ActionTypes.SET_IMAGES;

  constructor(public payload: Image[]) {}
}

export class AddImage implements Action {
  public readonly type = ActionTypes.ADD_IMAGE;

  constructor(public payload: Image) {}
}

export class SelectImage implements Action {
  public readonly type = ActionTypes.SELECT_IMAGE;

  constructor(public payload: Image) {}
}

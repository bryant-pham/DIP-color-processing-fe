import { Action } from '@ngrx/store';
import { Image } from '../models/image';
import { ActionTypes } from './actions/image.action';

export function selectedImageReducer(state: Image, action: Action) {
  switch (action.type) {
    case ActionTypes.SELECT_IMAGE:
      return action.payload;
    default:
      return state;
  }
}

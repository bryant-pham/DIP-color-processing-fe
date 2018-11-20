import { Action } from '@ngrx/store';
import { Image } from '../models/image';
import { ActionTypes } from './actions/image.action';

export function imageReducer(state: Image[] = [], action: Action) {
  switch (action.type) {
    case ActionTypes.SET_IMAGES:
      return [ ...action.payload ];
    case ActionTypes.ADD_IMAGE:
      return [ ...state, action.payload ];
    default:
      return state;
  }
}

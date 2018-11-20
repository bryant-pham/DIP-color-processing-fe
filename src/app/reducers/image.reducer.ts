import { Image } from '../models/image';
import { ActionTypes, ActionWithPayload } from './actions/image.action';

export function imageReducer(state: Image[] = [], action: ActionWithPayload<Image[]>) {
  switch (action.type) {
    case ActionTypes.SET_IMAGES:
      return [ ...action.payload ];
    case ActionTypes.ADD_IMAGE:
      return [ ...state, action.payload ];
    default:
      return state;
  }
}

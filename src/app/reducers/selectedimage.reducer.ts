import { Image } from '../models/image';
import { ActionTypes, ActionWithPayload } from './actions/image.action';

export function selectedImageReducer(state: Image, action: ActionWithPayload<Image>) {
  switch (action.type) {
    case ActionTypes.SELECT_IMAGE:
      return action.payload;
    default:
      return state;
  }
}

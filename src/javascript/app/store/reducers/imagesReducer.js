import uniqueBy from '../../../tools/unique/by';
import unique from '../../../tools/unique';
import { FILTER_FAVOURITE } from '../../../consts/specialTags';
import {
  ADD_IMAGES,
  DELETE_IMAGE,
  DELETE_IMAGES,
  GLOBAL_UPDATE,
  IMAGE_FAVOURITE_TAG,
  UPDATE_IMAGE,
  UPDATE_IMAGES_BATCH,
} from '../actions';

const imagesReducer = (value = [], action) => {
  switch (action.type) {
    case ADD_IMAGES:
      return uniqueBy('hash')([...value, ...action.payload]);
    case DELETE_IMAGE:
      return [...value.filter(({ hash }) => hash !== action.payload)];
    case DELETE_IMAGES:
      return [...value.filter(({ hash }) => !action.payload.includes(hash))];
    case UPDATE_IMAGE:
      return value.map((image) => (
        (image.hash === action.payload.hash) ? {
          ...image,
          ...action.payload,
        } : image
      ));
    case IMAGE_FAVOURITE_TAG:
      return value.map((image) => (
        (image.hash === action.payload.hash) ? {
          ...image,
          tags: unique(
            action.payload.isFavourite ?
              [FILTER_FAVOURITE, ...image.tags] :
              image.tags.filter((tag) => tag !== FILTER_FAVOURITE),
          ),
        } : image
      ));
    case UPDATE_IMAGES_BATCH:
      return value.map((image) => (
        // return changed image if existent in payload
        action.payload.find((changedImage) => (changedImage.hash === image.hash)) || image
      ));
    case GLOBAL_UPDATE:
      return uniqueBy('hash')(action.payload.images);
    default:
      return value;
  }
};

export default imagesReducer;

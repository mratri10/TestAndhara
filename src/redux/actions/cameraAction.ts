import {GETCAMERAURI} from '../../constants';

export const getURICamera = (data: UriData) => {
  return async (dispacth: DispatchType, getState: any) => {
    dispacth({
      type: GETCAMERAURI,
      payload: data,
    });
  };
};

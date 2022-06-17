import {GETCAMERAURI} from '../../constants';

const initState: UriData = {
  title: '',
  uri: '',
};

export default (state: UriData = initState, action: ReduxAction) => {
  switch (action.type) {
    case GETCAMERAURI:
      const dataPayload = action.payload as UriData;
      return dataPayload;
    default:
      return state;
  }
};

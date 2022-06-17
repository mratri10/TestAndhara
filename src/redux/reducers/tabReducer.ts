import {HOMETAB, PROFILETAB, ROUTE, SCANTAB} from '../../constants';

const initState: string = HOMETAB;

export default (state: string = initState, action: ReduxAction) => {
  switch (action.type) {
    case HOMETAB:
    case PROFILETAB:
    case SCANTAB:
      return action.type;

    case ROUTE:
      return action.payload;
    default:
      return state;
  }
};

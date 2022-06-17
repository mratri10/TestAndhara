import {ROUTE} from '../../constants';

export const tabAction = (tab: string) => {
  return async (dispacth: DispatchType, getState: any) => {
    dispacth({
      type: tab,
    });
  };
};

type ReduxState = {
  payload: Object;
};

type ReduxAction = {
  type: string;
  payload?: Object;
};

type DispatchType = (args: ReduxAction) => ReduxAction;

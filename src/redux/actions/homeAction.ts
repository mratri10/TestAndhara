export const createUser = (home: string) => {
  return async (dispacth: DispatchType, getState: any) => {
    dispacth({
      type: 'Data',
      payload: {
        body: {name: 'Atri'},
        title: 'Bobo',
      },
    });
  };
};

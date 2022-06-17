type Itab = {
  tab: string;
};

type TabValue = {
  active: boolean;
  name: string;
  onPress: () => void;
};

type RListener = {
  state: {
    stale: boolean;
    type: string;
    key: string;
    index: number;
    routeNames: string[];
  };
};

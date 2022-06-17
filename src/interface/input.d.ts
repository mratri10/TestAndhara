type VInput = {
  control: Control<TFieldValues>;
  defaultValue: string;
  name: string;
  title: string;
  isTitle?: boolean;
  type?: TypeInput;
  register?: UseFormRegister<FieldValues>;
  chList?: DataCH[];
};

type DataCH = {
  id: number;
  value: string;
};

type UriData = {
  title: string;
  uri: string;
};

type DateValue = {
  onPress: (event: GestureResponderEvent) => void;
  title?: string;
  dateA: Date;
  dateB: Date;
};

type ModalValue = {
  visible: boolean;
  onPress: (event: GestureResponderEvent) => void;
  onChangeDate: (event: GestureResponderEvent) => void;
};
type TypeViewBulan = {
  onPress: (event: GestureResponderEvent) => void;
};
type TypeViewTahun = {
  onPress: (event: GestureResponderEvent) => void;
  tahun: number;
};
type DateParams = {
  type: string;
  nomor: number;
};
type bulan = {
  id: number;
  name: string;
};
type kalender = {
  tahun: number;
  vbulan: bulan;
  pilih?: Date;
  onPress: (event: GestureResponderEvent) => void;
  range: number;
};

type TypeRange = {
  date: Date;
  range: number;
};

type TypeRangeInput = {
  onPressDate: (event: GestureResponderEvent) => void;
};

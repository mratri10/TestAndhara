import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconF from 'react-native-vector-icons/FontAwesome5';
import {TypeInput} from '../../screen/root';

function RangeDate({onPressDate}: TypeRangeInput) {
  const year = new Date().getFullYear();
  const [kMonth, setKMonth] = React.useState<bulan>();
  const [kYear, setKYear] = React.useState(year);
  const [isMonth, setIsMonth] = React.useState<boolean>(false);
  const [isYear, setIsYear] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<Date>();
  const [range, setRange] = React.useState<number>(0);

  const month = new Date().getMonth();

  React.useEffect(() => {
    setKMonth(vbulan(month));
  }, []);

  React.useEffect(() => {
    onPressDate({range: range, date: date});
  }, [range, date]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={dateStyle.buttonBottomArrow}
            onPress={() => {
              setIsMonth(!isMonth);
            }}>
            <Text style={dateStyle.textBottomArrow}>{kMonth?.name}</Text>
            <View style={{width: 10}} />
            <IconF name="angle-down" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={dateStyle.buttonBottomArrow}
            onPress={() => {
              setIsYear(!isYear);
            }}>
            <Text style={dateStyle.textBottomArrow}>{kYear}</Text>
            <View style={{width: 10}} />
            <IconF name="angle-down" size={24} />
          </TouchableOpacity>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={
                kMonth?.id == 0
                  ? dateStyle.buttonArrowDisable
                  : dateStyle.buttonArrow
              }
              disabled={kMonth?.id == 0}
              onPress={() => setKMonth(vbulan(kMonth?.id! - 1))}>
              <IconF name="angle-left" size={16} color="white" />
            </TouchableOpacity>
            <View style={{width: 10}} />
            <TouchableOpacity
              disabled={kMonth?.id == 11}
              style={
                kMonth?.id == 11
                  ? dateStyle.buttonArrowDisable
                  : dateStyle.buttonArrow
              }
              onPress={() => setKMonth(vbulan(kMonth?.id! + 1))}>
              <IconF name="angle-right" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <KalenderView
            key={date?.toLocaleString()}
            onPress={v => {
              if (date?.getMonth() == kMonth?.id && date?.getDate()! < v) {
                setRange(v - date?.getDate()!);
              } else {
                setDate(new Date(kYear, kMonth?.id!, v));
                setRange(0);
              }

              if (date?.getDate() == v) {
                setDate(new Date(1800));
              }
            }}
            tahun={kYear}
            vbulan={{id: kMonth?.id ?? 0, name: kMonth?.name ?? ''}}
            pilih={date}
            range={range}
          />
          {isMonth ? (
            <PilihBulan
              onPress={(v: number) => {
                setKMonth(vbulan(v));
                setIsMonth(!isMonth);
              }}
            />
          ) : null}
          {isYear ? (
            <PilihTahun
              tahun={year}
              onPress={(v: number) => {
                setIsYear(!isYear);
                setKYear(v);
              }}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const KalenderView = (v: kalender) => {
  const day1 = new Date(v.tahun, v.vbulan.id, 1).getDay() - 1;
  const lastday1 = new Date(v.tahun, v.vbulan.id, 0).getDate();
  const lastday2 = new Date(v.tahun, v.vbulan.id + 1, 0).getDate();

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
          (item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 40,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={dateStyle.textDay}>{item}</Text>
              </View>
            );
          },
        )}
      </View>
      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          width: 280,
          backgroundColor: 'white',
        }}>
        {tanggal(day1, lastday1, lastday2).map((item, index) => {
          const isPilih: boolean =
            new Date(v.tahun, v.vbulan.id, item.nomor).toLocaleString() ==
            v.pilih?.toLocaleString();
          let rangeNumber: String[] = [];
          for (let i = 0; i < v.range; i++) {
            rangeNumber!.push(
              new Date(
                v.tahun,
                v.vbulan.id,
                v.pilih?.getDate()! + i,
              ).toLocaleString(),
            );
          }
          const numRange: number = rangeNumber.filter(
            db =>
              new Date(v.tahun, v.vbulan.id, item.nomor).toLocaleString() == db,
          ).length;
          const isRange: boolean =
            numRange > 0 &&
            v.vbulan.id === v.pilih?.getMonth() &&
            v.tahun === v.pilih?.getFullYear();
          const dateRange: string = new Date(
            v.pilih?.getFullYear()!,
            v.pilih?.getMonth()!,
            v.pilih?.getDate()! + v.range,
          ).toLocaleString();
          const isRangeResult: boolean =
            dateRange ==
            new Date(v.tahun, v.vbulan.id, item.nomor).toLocaleString();
          return (
            <View key={index}>
              {isPilih && item.type !== 'out' && isRange ? (
                <View
                  style={{
                    marginTop: 8,
                    marginLeft: 10,
                    position: 'absolute',
                    width: 30,
                    height: 24,
                    backgroundColor: 'red',
                  }}
                />
              ) : null}
              {!isPilih && item.type !== 'out' && isRangeResult ? (
                <View
                  style={{
                    marginTop: 8,
                    marginRight: 10,
                    position: 'absolute',
                    width: 30,
                    height: 24,
                    backgroundColor: 'red',
                  }}
                />
              ) : null}

              <TouchableOpacity
                onPress={() => v.onPress(item.nomor)}
                key={index}
                disabled={item.type == 'out'}
                style={
                  isPilih && item.type !== 'out'
                    ? dateStyle.viewNumberCalenderTandai
                    : isRange && item.type !== 'out'
                    ? dateStyle.viewNumberRange
                    : isRangeResult && item.type !== 'out'
                    ? dateStyle.viewNumberRangeTandai
                    : dateStyle.viewNumberCalender
                }>
                {(isPilih && item.type !== 'out') ||
                (isRange && item.type !== 'out') ||
                (isRangeResult && item.type !== 'out') ? (
                  <Text style={dateStyle.textCalenderPilih}>{item.nomor}</Text>
                ) : (
                  <View>
                    {item.type == 'normal' ? (
                      <Text style={dateStyle.textCalender}>{item.nomor}</Text>
                    ) : (
                      <View />
                    )}
                    {item.type == 'libur' ? (
                      <Text style={dateStyle.textCalenderLibur}>
                        {item.nomor}
                      </Text>
                    ) : (
                      <View />
                    )}
                    {item.type == 'out' ? (
                      <Text style={dateStyle.textCalenderOut}>
                        {item.nomor}
                      </Text>
                    ) : (
                      <View />
                    )}
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const PilihBulan = ({onPress}: TypeViewBulan) => {
  return (
    <View
      style={{
        position: 'absolute',
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: 230,
        flexGrow: 0,
        flexShrink: 2,
        flexBasis: 100,
        backgroundColor: 'white',
        borderRadius: 5,
      }}>
      {listBulan.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onPress(item.id)}
            key={index}
            style={{
              width: 100,
              backgroundColor: '#f2f2f2',
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'grey',
              marginLeft: 10,
              marginBottom: 10,
            }}>
            <Text style={{textAlign: 'center'}} key={index}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const PilihTahun = ({onPress, tahun}: TypeViewTahun) => {
  const tahunList: number[] = [];
  for (let i = 0; i < 9; i++) {
    const awal = tahun - 4;
    tahunList.push(awal + i);
  }
  return (
    <View style={dateStyle.tahunList}>
      {tahunList.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => onPress(item)}
            key={index}
            style={{
              width: 80,
              backgroundColor: '#f2f2f2',
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: 'grey',
              marginLeft: 10,
              marginBottom: 10,
            }}>
            <Text style={{textAlign: 'center'}} key={index}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const tanggal = (
  day1: number,
  lastday1: number,
  lastday2: number,
): DateParams[] => {
  const tgl: DateParams[] = [];

  const selisih: number = lastday1 + 1 - day1;

  if (day1 < 0) {
    for (let i = 0; i < 6; i++) {
      const lama: DateParams = {
        type: 'out',
        nomor: lastday1 - 5 + i,
      };
      tgl.push(lama);
    }
  } else {
    for (let i = 0; i < day1; i++) {
      const lama: DateParams = {
        type: 'out',
        nomor: selisih + i,
      };
      tgl.push(lama);
    }
  }
  if (day1 < 0) {
    const normal: DateParams = {
      type: 'normal',
      nomor: 1,
    };
    tgl.push(normal);
  }

  for (let i = 1; i < lastday2 + 1; i++) {
    if (ke_6.includes(i + day1 - 1)) {
      const libur: DateParams = {
        type: 'libur',
        nomor: i,
      };
      tgl.push(libur);
    }
    if (ke_7.includes(i + day1 - 1)) {
      const libur: DateParams = {
        type: 'libur',
        nomor: i,
      };
      tgl.push(libur);
    }
    if (ke_Lain.includes(i + day1 - 1)) {
      const normal: DateParams = {
        type: 'normal',
        nomor: i,
      };
      tgl.push(normal);
    }
  }
  let sumLama: number = 0;
  const bagi7: number = parseInt((tgl.length / 7).toString());

  switch (bagi7) {
    case 4:
      sumLama = 35 - tgl.length;
      break;
    case 5:
      sumLama = 42 - tgl.length;
      break;
    default:
      sumLama = 48 - tgl.length;
      break;
  }
  if (sumLama < 7) {
    for (let i = 1; i < sumLama + 1; i++) {
      tgl.push({
        nomor: i,
        type: 'out',
      });
    }
  }

  return tgl;
};
const listBulan: bulan[] = [
  {id: 0, name: 'Januari'},
  {id: 1, name: 'Februari'},
  {id: 2, name: 'Maret'},
  {id: 3, name: 'April'},
  {id: 4, name: 'Mei'},
  {id: 5, name: 'Juni'},
  {id: 6, name: 'Juli'},
  {id: 7, name: 'Agustus'},
  {id: 8, name: 'September'},
  {id: 9, name: 'Oktober'},
  {id: 10, name: 'November'},
  {id: 11, name: 'Desember'},
];

const vbulan = (id: number): bulan =>
  listBulan.filter(item => item.id == id)[0];

const dateStyle = StyleSheet.create({
  tahunList: {
    position: 'absolute',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 270,
    flexGrow: 0,
    flexShrink: 2,
    flexBasis: 100,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  viewNumberCalender: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewNumberCalenderTandai: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 20,
  },
  viewNumberRangeTandai: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 20,
  },
  viewNumberRange: {
    width: 40,
    height: 24,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  textDay: {
    color: 'black',
    fontWeight: 'bold',
  },
  textCalender: {
    color: 'black',
  },
  textCalenderOut: {
    color: 'grey',
  },
  textCalenderLibur: {
    color: 'blue',
  },
  textCalenderPilih: {
    color: 'white',
  },

  buttonArrow: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArrowDisable: {
    backgroundColor: 'grey',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBottomArrow: {
    flexDirection: 'row',
  },
  textBottomArrow: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const ke_6 = [5, 12, 19, 26, 33];
const ke_7 = [6, 13, 20, 27, 34];
const ke_Lain = [
  0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 28,
  29, 30, 31, 32, 35, 36, 37, 38, 39,
];

export default RangeDate;

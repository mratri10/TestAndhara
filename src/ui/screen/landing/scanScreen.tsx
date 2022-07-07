import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../root';
type prop = NativeStackNavigationProp<RootStackParamList, 'landing'>;
function ScanScreen() {
  const navigation = useNavigation<prop>();
  const [time, setTime] = useState<String>('');
  const tanggal: String = new Date().toLocaleDateString();
  useEffect(() => {
    const jamNow: String = new Date().getHours().toString();
    const menitNow: String = new Date().getMinutes().toString();
    const detikNow: String = new Date().getSeconds().toString();

    const interval = setInterval(() => {
      setTime(
        formatTime(jamNow) +
          ':' +
          formatTime(menitNow) +
          ':' +
          formatTime(detikNow),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <View style={styleAbsensi.app}>
      <View style={styleAbsensi.body}>
        <View style={styleAbsensi.header}>
          <View style={styleAbsensi.cardFoto} />
          <View style={styleAbsensi.infoProfile}>
            <Text>Ajie Maulana</Text>
            <Text>081270937373</Text>
            <Text>ajiemaulana@gmail.com</Text>
          </View>
        </View>
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 18}}>{tanggal}</Text>
          <SizedBox width={20} />
          <Text style={{fontSize: 18}}>{time}</Text>
        </View>
        <TableAbsen />
        <SizedBox height={20} />
        <TouchableOpacity onPress={() => navigation.navigate('form_absen')}>
          <View
            style={{
              backgroundColor: 'blue',
              padding: 10,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Absen Masuk</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styleAbsensi = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 10,
  },

  header: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  body: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  infoProfile: {
    marginLeft: 10,
  },
  cardFoto: {
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: 'teal',
  },
});

const TableAbsen = () => {
  return (
    <View style={{flexDirection: 'row'}}>
      <ItemAbsen
        title="Jadwal"
        value="Logishift"
        color="rgba(167, 78,78,0.2)"
        textColor="rgb(167, 78,78)"
      />
      <SizedBox width={10} />
      <ItemAbsen
        title="Jam Masuk"
        value="08:00:00"
        color="rgba(167, 167,78,0.2)"
        textColor="rgb(167, 167,78)"
      />
      <SizedBox width={10} />
      <ItemAbsen
        title="Jam Pulang"
        value="17:00:00"
        color="rgba(78, 78,167,0.2)"
        textColor="rgb(78, 78,167)"
      />
    </View>
  );
};
const ItemAbsen = ({
  title = '',
  value = '',
  color = 'white',
  textColor = 'black',
}) => {
  return (
    <View style={{flex: 1}}>
      <Text>{title}</Text>
      <View
        style={[
          {
            backgroundColor: color,
            padding: 5,
            borderRadius: 5,
            alignItems: 'center',
          },
        ]}>
        <Text style={{color: textColor, fontWeight: 'bold'}}>{value}</Text>
      </View>
    </View>
  );
};

const SizedBox = ({height = 0, width = 0}) => (
  <View style={{height: height, width: width}}></View>
);

const formatTime = (time: String) => {
  if (time.length == 1) {
    return '0' + time;
  } else {
    return time;
  }
};

export default ScanScreen;

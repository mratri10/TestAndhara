import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ApplicationState} from '../../../redux/reducers';
import InputApp from '../../widget/InputApp';
import {RootStackParamList, TypeInput} from '../root';
import IconF5 from 'react-native-vector-icons/FontAwesome5';

type prop = NativeStackNavigationProp<RootStackParamList, 'form_absen'>;
function FormAbsen() {
  const navigation = useNavigation<prop>();
  const uriData: UriData = useSelector(
    (state: ApplicationState) => state.cameraReducer,
  );
  const {control, handleSubmit, register} = useForm();

  React.useEffect(() => {}, [uriData]);
  return (
    <View style={{padding: 20, backgroundColor: '#ddd', flex: 1}}>
      <View style={{backgroundColor: 'white', borderRadius: 10, padding: 10}}>
        <Text>Lokasi Kerja</Text>
        <SizedBox height={5} />
        <InputApp
          title="Lokasi Kerja"
          defaultValue=""
          name="lokasi"
          control={control}
          chList={[
            {value: 'Work From Home', id: 1},
            {value: 'Work From Office', id: 2},
          ]}
          type={TypeInput.CHECKBOX_HORIZONTAL}
        />
        <SizedBox height={10} />

        <LineView />
        <SizedBox height={10} />

        <Text>Upload Photo</Text>
        <SizedBox height={5} />

        <TouchableOpacity onPress={() => navigation.navigate('camera')}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 20,
                backgroundColor: 'white',
                borderRadius: 10,
                marginBottom: 20,
              }}>
              {uriData.uri.length > 0 ? (
                <Image
                  source={{uri: uriData.uri}}
                  style={{
                    height: 90,
                    width: 90,
                    borderRadius: 45,
                  }}
                />
              ) : (
                <IconF5 name="camera" size={50} />
              )}
            </View>
          </View>
        </TouchableOpacity>
        <SizedBox height={10} />
        <LineView />
        <SizedBox height={10} />

        <Text>Tanda Tangan</Text>
        <SizedBox height={5} />
        <View style={{height: 250, borderWidth: 1}}></View>

        <SizedBox height={25} />

        <TouchableOpacity
          onPress={() => navigation.navigate('landing')}
          style={{
            backgroundColor: 'grey',
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>CLose</Text>
        </TouchableOpacity>
        <SizedBox height={10} />
        <TouchableOpacity
          onPress={() => navigation.navigate('landing')}
          style={{
            backgroundColor: 'blue',
            paddingVertical: 10,
            paddingHorizontal: 20,
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SizedBox = ({height = 0, width = 0}) => (
  <View style={{height: height, width: width}}></View>
);
const LineView = ({color = '#000', height = 1}) => (
  <View style={{backgroundColor: color, height: height}} />
);

export default FormAbsen;

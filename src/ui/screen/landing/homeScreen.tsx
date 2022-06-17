import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import * as React from 'react';
import {useForm} from 'react-hook-form';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import {
  EMAILVALIDATION,
  PHONEVALIDATION,
  USIAVALIDATION,
  NAMAVALIDATION,
} from '../../../constants';
import InputApp from '../../widget/InputApp';
import {RootStackParamList, TypeInput} from '../root';
import {ApplicationState} from '../../../redux/reducers';

type prop = NativeStackNavigationProp<RootStackParamList, 'landing'>;
function HomeScreen() {
  const navigation = useNavigation<prop>();
  const {control, handleSubmit, register} = useForm();
  const uriData: UriData = useSelector(
    (state: ApplicationState) => state.cameraReducer,
  );
  const onSubmit = (v: any) => {
    console.log(JSON.stringify(v));
  };

  React.useEffect(() => {}, [uriData]);
  return (
    <View style={[styleProfile.backgroundApp]}>
      <FlatList
        data={[]}
        renderItem={({item, index}) => <View />}
        ListHeaderComponent={
          <View>
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

            <View style={[styleProfile.cardInput]}>
              <Text style={styleProfile.cardTitle}>Profil Saya</Text>
              <View style={{height: 10}} />
              <InputApp
                title="Name"
                isTitle={true}
                defaultValue=""
                name="name"
                control={control}
                register={register('name', NAMAVALIDATION)}
              />
              <View style={styleProfile.lineHorizontal} />
              <View style={{height: 10}} />
              <InputApp
                title="Usia"
                isTitle={true}
                defaultValue=""
                name="usia"
                control={control}
                type={TypeInput.NUMBER}
                register={register('usia', USIAVALIDATION)}
              />
              <View style={styleProfile.lineHorizontal} />
              <View style={{height: 10}} />
              <InputApp
                title="Jenis Kelamin"
                defaultValue=""
                name="gendet"
                control={control}
                chList={[
                  {value: 'Laki-Laki', id: 1},
                  {value: 'Perempuan', id: 2},
                ]}
                type={TypeInput.CHECKBOX_HORIZONTAL}
              />
              <View style={{height: 10}} />
              <InputApp
                title="Tanggal Lahir"
                defaultValue=""
                name="birth"
                control={control}
                type={TypeInput.DATERANGE}
              />
            </View>
            <View style={{height: 10}} />
            <View style={[styleProfile.cardInput]}>
              <Text style={styleProfile.cardTitle}>Kontak Saya</Text>
              <View style={{height: 10}} />
              <InputApp
                title="Email"
                defaultValue=""
                name="email"
                isTitle={true}
                control={control}
                type={TypeInput.EMAIL}
                register={register('email', EMAILVALIDATION)}
              />
              <View style={styleProfile.lineHorizontal} />

              <View style={{height: 10}} />
              <InputApp
                title="Phone"
                defaultValue=""
                name="phone"
                isTitle={true}
                control={control}
                type={TypeInput.NUMBER}
                register={register('phone', PHONEVALIDATION)}
              />
              <View style={styleProfile.lineHorizontal} />
              <View style={{height: 10}} />
              <InputApp
                title="Facebook"
                defaultValue=""
                name="facebook"
                isTitle={true}
                control={control}
                type={TypeInput.TEXT}
              />
            </View>
            <View style={{height: 40}} />
          </View>
        }
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styleProfile.buttonApp}>
        <Text style={styleProfile.textButton}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styleProfile = StyleSheet.create({
  backgroundApp: {
    backgroundColor: '#f2f2f2',
    margin: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardInput: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  lineHorizontal: {
    height: 1,
    backgroundColor: '#ddd',
  },
  buttonApp: {
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

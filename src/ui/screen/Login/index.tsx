import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PasswordVALIDATION, USERNAMEVALIDATION} from '../../../constants';
import InputApp from '../../widget/InputApp';
import {RootStackParamList, TypeInput} from '../root';

type prop = NativeStackNavigationProp<RootStackParamList, 'login'>;
function LoginScreen() {
  const navigation = useNavigation<prop>();
  const {control, handleSubmit, register} = useForm();
  const onSubmit = (v: any) => console.log(JSON.stringify(v));
  // navigation.navigate('landing');
  return (
    <View style={styleLogin.app}>
      <View style={styleLogin.input}>
        <Text>Selamat Datang</Text>
        <SizedBox height={30} />

        <View style={styleLogin.inputBorder}>
          <InputApp
            title="Username"
            isTitle={true}
            defaultValue=""
            name="username"
            control={control}
            type={TypeInput.EMAIL}
            register={register('usia', USERNAMEVALIDATION)}
          />
          <LineView height={1} color="black" />
        </View>
        <SizedBox height={10} />
        <View style={styleLogin.inputBorder}>
          <InputApp
            title="Password"
            isTitle={true}
            defaultValue=""
            name="password"
            control={control}
            type={TypeInput.PASSWORD}
            register={register('usia', PasswordVALIDATION)}
          />
          <LineView height={1} color="black" />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleSubmit(onSubmit);
          navigation.navigate('landing');
        }}
        style={styleLogin.buttonApp}>
        <Text style={styleLogin.textButton}>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

const SizedBox = ({height = 0, width = 0}) => (
  <View style={{height: height, width: width}}></View>
);
const LineView = ({color = '#000', height = 1}) => (
  <View style={{backgroundColor: color, height: height}} />
);

const styleLogin = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 20,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  inputBorder: {
    borderWidth: 1,
    borderRadius: 10,
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 30,
  },
});

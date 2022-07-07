import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {RootStackParamList} from './root';

type prop = NativeStackNavigationProp<RootStackParamList, 'splash'>;
function SplashScreen() {
  const navigation = useNavigation<prop>();

  useEffect(() => {
    durationSplash();
  }, []);

  const durationSplash = () => {
    setTimeout(() => {
      navigation.navigate('login');
    }, 3000);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'blue',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 26, color: 'white', textAlign: 'center'}}>
        Universitas Muhammadiyah Tangerang
      </Text>
    </View>
  );
}

export default SplashScreen;

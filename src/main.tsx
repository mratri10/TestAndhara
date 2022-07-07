import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Alert, BackHandler} from 'react-native';
import LandingScreen from './ui/screen/landing';
import SplashScreen from './ui/screen/splashScreen';
import CameraApp from './ui/screen/CameraApp';
import LoginScreen from './ui/screen/Login';
import FormAbsen from './ui/screen/form_absen';

function Andhara() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {}, []);
  const backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exitttt?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };

  const backAction = (data: RListener) => {
    if (data.state.index == 1) {
      BackHandler.addEventListener('hardwareBackPress', backPressed);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', backPressed);
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenListeners={{
          state: e => backAction(e.data as RListener),
        }}>
        <Stack.Screen
          name="splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Group>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="landing"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="form_absen"
            component={FormAbsen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="camera"
            component={CameraApp}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Andhara;

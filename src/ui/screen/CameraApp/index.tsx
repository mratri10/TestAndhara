import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {Dispatch} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {CameraOptions} from 'react-native-camera-hooks/src/initialState';
import {useDispatch} from 'react-redux';
import {getURICamera} from '../../../redux/actions';
import {RootStackParamList} from '../root';

type propNavigate = NativeStackNavigationProp<RootStackParamList, 'camera'>;
const CameraScreen: React.FC<CameraOptions> = initialProps => {
  const dispatch: Dispatch<any> = useDispatch();
  const [{cameraRef}, {takePicture}] = useCamera(initialProps);
  const navigation = useNavigation<propNavigate>();
  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View
        style={{
          bottom: 0,
          right: 0,
          left: 0,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={async () => {
            await takePicture().then(resp => {
              dispatch(getURICamera({title: 'profile', uri: resp.uri}));
              navigation.goBack();
            });
          }}
          style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: 'black',
  },
  preview: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

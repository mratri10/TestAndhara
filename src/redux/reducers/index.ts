import {combineReducers} from '@reduxjs/toolkit';
import HomReducer from './homReducer';
import TabReducer from './tabReducer';
import CameraReducer from './cameraReducer';

const rootReducer = combineReducers({
  homeReducer: HomReducer,
  tabReducer: TabReducer,
  cameraReducer: CameraReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export default rootReducer;

// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
// // const store = createStore(reducers, {}, applyMiddleware(thunk))

import reducers from './redux/reducers'
import { configureStore } from "@reduxjs/toolkit";
    
const store = configureStore({ reducer: reducers })

export default store
import { applyMiddleware, createStore } from 'redux';
//import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const intialState = {};

const middleWare = [thunk];

const store = createStore(
    rootReducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
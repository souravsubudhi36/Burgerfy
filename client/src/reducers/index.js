import {combineReducers} from 'redux';
import authreducer from './authreducer'
import storereducer from './storereducer'
import burgerreducer from './burgerreducer'
import uireducer from './uireducer'
import {reducer} from 'redux-form';

export default combineReducers ({
  auth : authreducer,
  burger : burgerreducer,
  store : storereducer,
  ui : uireducer,
  form : reducer
});

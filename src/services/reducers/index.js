import { combineReducers } from 'redux';
import mainReducer from '../slices/mainSlice'

export const rootReducer = combineReducers({
  main: mainReducer
})
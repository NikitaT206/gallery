import { combineReducers } from 'redux';
import mainReducer from '../slices/mainSlice'
import infoPanelReducer from '../slices/infoPanelSlice'

export const rootReducer = combineReducers({
  main: mainReducer,
  infoPanel: infoPanelReducer
})
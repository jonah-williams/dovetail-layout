import { combineReducers } from 'redux'
import jointReducer from './Joint'

export default combineReducers({
  joint: jointReducer
})
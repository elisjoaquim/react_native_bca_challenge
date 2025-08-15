import { combineReducers } from '@reduxjs/toolkit';
import { vehicleReducer } from './vehicleReducer/vehicleReducer';

/**
 * Combines all reducers into a Root reducer
 */
export default combineReducers({
  vehicles: vehicleReducer,
});

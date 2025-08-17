import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TVehiclesState } from './type';
import VEHICLES_DATA from '../../../../../assets/data/vehicles.json';
import { mapVehiclesById } from '../../../../helpers/ObjectHelpers';

const SLICE_NAME = 'vehicles';

/**
 * Initial state
 */
const initialState: TVehiclesState = {
  vehicles: mapVehiclesById(VEHICLES_DATA),
};

/**
 * Vehicles slice
 */
const VehiclesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toggleFavourite: (state, action: PayloadAction<number>) => {
      const vehicleId = action.payload;
      if (state.vehicles[vehicleId]) {
        state.vehicles[vehicleId].favourite =
          !state.vehicles[vehicleId].favourite;
      }
    },
  },
});

export const vehicleActions = VehiclesSlice.actions;

export const vehicleReducer = VehiclesSlice.reducer;

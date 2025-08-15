import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TVehicles, TVehiclesState } from './type';
import VEHICLES_DATA from '../../../../../assets/data/vehicles.json';

const SLICE_NAME = 'vehicles';

/**
 * Initial state
 */
const initialState: TVehiclesState = {
  vehicles: {},
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
    mapVehiclesById: state => {
      const vehiclesById: Record<number, TVehicles> = {};
      VEHICLES_DATA.forEach(vehicle => {
        vehiclesById[vehicle.id] = vehicle;
      });
      state.vehicles = vehiclesById;
    },
  },
});

export const vehicleActions = VehiclesSlice.actions;

export const vehicleReducer = VehiclesSlice.reducer;

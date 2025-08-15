import { useEffect } from 'react';
import store from '../redux/store';
import { vehicleActions } from '../redux/store/reducers/vehicleReducer/vehicleReducer';

const useAppInitializers = () => {
  useEffect(() => {
    if (
      !store.getState().vehicles.vehicles ||
      Object.keys(store.getState().vehicles.vehicles).length === 0
    ) {
      store.dispatch(vehicleActions.mapVehiclesById());
    }
  }, []);
};

export default useAppInitializers;

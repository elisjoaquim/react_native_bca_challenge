import {
  createContext,
  PropsWithChildren,
  useState,
  useMemo,
  useCallback,
  useContext,
} from 'react';
import { mapVehiclesById } from '../../helpers/ObjectHelpers';
import VEHICLES_DATA from '../../../assets/data/vehicles.json';
import { TVehicleContext } from './types';

export const VehicleContext = createContext<TVehicleContext>(
  {} as TVehicleContext,
);

export const VehicleProvider = ({ children }: PropsWithChildren) => {
  const [vehicles, setVehicles] = useState(mapVehiclesById(VEHICLES_DATA));

  const toggleFavourite = useCallback((id: number) => {
    setVehicles(prevVehicles => {
      const vehicle = prevVehicles[id];
      if (vehicle) {
        return {
          ...prevVehicles,
          [id]: { ...vehicle, favourite: !vehicle.favourite },
        };
      }
      return prevVehicles;
    });
  }, []);

  const value = useMemo(
    () => ({ vehicles, toggleFavourite }),
    [vehicles, toggleFavourite],
  );

  return (
    <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
  );
};

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicleContext must be used within a VehicleProvider');
  }
  return context;
};

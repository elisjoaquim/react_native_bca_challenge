import { useContext, useMemo } from 'react';
import { TVehicles } from '../contexts/VehicleContext/types';
import { VehicleContext } from '../contexts/VehicleContext/vehicleContext';

const useVehicles = () => {
  const { vehicles, toggleFavourite } = useContext(VehicleContext);

  const getAllVehicles = useMemo(() => {
    return Object.values(vehicles);
  }, [vehicles]);

  const getVehicleById = (id: number) => {
    return vehicles[id];
  };

  const getAllFavorites = useMemo(() => {
    return Object.values(vehicles).filter(
      (vehicle: TVehicles) => vehicle.favourite,
    );
  }, [vehicles]);

  const allCarMakes = useMemo(() => {
    return Array.from(new Set(getAllVehicles.map(vehicle => vehicle.make)));
  }, [getAllVehicles]);

  const allCarYears = useMemo(() => {
    return Array.from(new Set(getAllVehicles.map(vehicle => vehicle.year)));
  }, [getAllVehicles]);

  const minAndMaxStartingBids = useMemo(() => {
    const prices = getAllVehicles
      .map(vehicle => vehicle.startingBid)
      .sort((a, b) => a - b);
    const minPrice = prices[0] || 0;
    const maxPrice = prices[prices.length - 1] || 0;
    return { min: minPrice, max: maxPrice };
  }, [getAllVehicles]);

  return {
    getAllVehicles,
    getVehicleById,
    getAllFavorites,
    allCarMakes,
    allCarYears,
    minAndMaxStartingBids,
    toggleFavourite,
  };
};

export default useVehicles;

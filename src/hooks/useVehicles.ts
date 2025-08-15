import { useMemo } from 'react';
import { useAppSelector } from './useRedux';
import { TVehicles } from '../redux/store/reducers/vehicleReducer/type';
import { useDispatch } from 'react-redux';
import { vehicleActions } from '../redux/store/reducers/vehicleReducer/vehicleReducer';

const useVehicles = () => {
  const vehicles = useAppSelector(state => state.vehicles.vehicles);
  const dispatch = useDispatch();

  const toggleFavourite = (vehicleId: number) => {
    dispatch(vehicleActions.toggleFavourite(vehicleId));
  };

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

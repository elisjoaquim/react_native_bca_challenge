import { TVehicles } from '../redux/store/reducers/vehicleReducer/type';

export const mapVehiclesById = (
  data: TVehicles[],
): Record<number, TVehicles> => {
  const vehiclesById: Record<number, TVehicles> = {};
  data.forEach(vehicle => {
    vehiclesById[vehicle.id] = vehicle;
  });
  return vehiclesById;
};

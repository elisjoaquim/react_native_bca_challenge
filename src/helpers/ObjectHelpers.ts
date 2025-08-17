import { TVehicles } from '../contexts/VehicleContext/types';

export const mapVehiclesById = (
  data: TVehicles[],
): Record<number, TVehicles> => {
  const vehiclesById: Record<number, TVehicles> = {};
  data.forEach(vehicle => {
    vehiclesById[vehicle.id] = vehicle;
  });
  return vehiclesById;
};

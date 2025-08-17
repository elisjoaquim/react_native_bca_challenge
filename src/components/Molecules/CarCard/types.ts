import { TVehicles } from '../../../contexts/VehicleContext/types';

export interface ICardProps {
  item: TVehicles;
  onPress: () => void;
  onFavoritePress?: (vehicleId: number) => void;
}

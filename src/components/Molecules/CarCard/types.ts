import { TVehicles } from '../../../redux/store/reducers/vehicleReducer/type';

export interface ICardProps {
  item: TVehicles;
  onPress: () => void;
  onFavoritePress?: (vehicleId: number) => void;
}

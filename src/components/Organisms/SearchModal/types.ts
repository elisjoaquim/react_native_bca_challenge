import { TVehicles } from '../../../redux/store/reducers/vehicleReducer/type';
import { IModalContainerProps } from '../../Molecules/ModalContainer/types';

export interface ISearchModalProps
  extends Omit<IModalContainerProps, 'children' | 'title'> {
  vehicles: TVehicles[];
}

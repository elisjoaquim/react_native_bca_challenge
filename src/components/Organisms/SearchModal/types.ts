import { TVehicles } from '../../../contexts/VehicleContext/types';
import { IModalContainerProps } from '../../Molecules/ModalContainer/types';

export interface ISearchModalProps
  extends Omit<IModalContainerProps, 'children' | 'title'> {
  vehicles: TVehicles[];
}

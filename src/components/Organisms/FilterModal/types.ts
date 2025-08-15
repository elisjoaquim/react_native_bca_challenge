import { IModalContainerProps } from '../../Molecules/ModalContainer/types';

export interface IFilterModalProps
  extends Omit<IModalContainerProps, 'children' | 'title'> {
  availableMakes?: string[];
  availableYears?: number[];
  availableStartingBidRanges?: { min: number; max: number };
}

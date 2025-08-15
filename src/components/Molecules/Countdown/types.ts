import { ViewStyle } from 'react-native';

export interface ICountdownProps {
  startTime: string;
  onEnd?: () => void;
  style?: ViewStyle;
}

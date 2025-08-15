import { icons } from 'lucide-react-native';
import { ViewStyle } from 'react-native';

export interface IButtonProps {
  onPress: () => void;
  disabled?: boolean;
  iconName?: keyof typeof icons;
  iconSize?: number;
  iconFill?: string;
  style?: ViewStyle;
}

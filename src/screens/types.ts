import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type ScreensParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.FAVORITES]: undefined;
  [SCREENS.DETAILS]: { vehicleId: number };
  [NAVIGATORS.INITIAL_BOTTOM_TAB]: undefined;
};

export enum SCREENS {
  DETAILS = 'DETAILS',
  HOME = 'HOME',
  FAVORITES = 'FAVORITES',
}

export const NAVIGATORS = {
  MAIN_STACK: 'MAIN_STACK',
  INITIAL_BOTTOM_TAB: 'INITIAL_BOTTOM_TAB',
};

export type HomeScreenProps = NativeStackScreenProps<
  ScreensParamList,
  SCREENS.HOME
>;

export type FavoritesScreenProps = NativeStackScreenProps<
  ScreensParamList,
  SCREENS.FAVORITES
>;

export type CarDetailsScreenProps = NativeStackScreenProps<
  ScreensParamList,
  SCREENS.DETAILS
>;

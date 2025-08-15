import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATORS, SCREENS, ScreensParamList } from './src/screens/types';
import { CarDetails, Favorites, Home } from './src/screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from './src/components/Atoms/Icon/Icon';
import { Colors } from './src/constants/Colors';
import { PortalProvider } from '@gorhom/portal';
import useAppInitializers from './src/hooks/useAppInitializers';

const Stack = createNativeStackNavigator<ScreensParamList>();
const Tab = createBottomTabNavigator<ScreensParamList>();

const HomeTabBarIcon = (props: { focused: boolean }) => (
  <Icon name="House" color={props.focused ? Colors.cyanBlue : Colors.gray} />
);

const FavoritesTabBarIcon = (props: { focused: boolean }) => (
  <Icon name="Star" color={props.focused ? Colors.cyanBlue : Colors.gray} />
);

function InitialTabScreens() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: HomeTabBarIcon,
        }}
        name={SCREENS.HOME}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: FavoritesTabBarIcon,
        }}
        name={SCREENS.FAVORITES}
        component={Favorites}
      />
    </Tab.Navigator>
  );
}

function App() {
  useAppInitializers();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PortalProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name={NAVIGATORS.INITIAL_BOTTOM_TAB}
                component={InitialTabScreens}
              />
              <Stack.Screen name={SCREENS.DETAILS} component={CarDetails} />
            </Stack.Navigator>
          </NavigationContainer>
        </PortalProvider>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;

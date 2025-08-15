import { View, StyleSheet, Alert } from 'react-native';
import React from 'react';
import HeaderTitle from '../components/Molecules/HeaderTitle/HeaderTitle';
import { FlashList } from '@shopify/flash-list';
import { CarCard } from '../components/Molecules';
import useVehicles from '../hooks/useVehicles';
import { FavoritesScreenProps, SCREENS } from './types';
import { SafeAreaViewFixed } from '../components/Atoms';

const Favorites = ({ navigation }: FavoritesScreenProps) => {
  const { getAllFavorites, toggleFavourite } = useVehicles();

  const alertBeforeUpdating = (vehicleId: number) => {
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to remove this vehicle from favorites? By confirming you may lose the sight of this vehicle.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => toggleFavourite(vehicleId),
        },
      ],
    );
  };

  return (
    <SafeAreaViewFixed edges={['top', 'left', 'right']} style={styles.safeArea}>
      <View style={styles.container}>
        <HeaderTitle style={styles.headerTitle} title="Your Favorites" />
        <FlashList
          numColumns={2}
          data={getAllFavorites}
          renderItem={({ item }) => (
            <CarCard
              item={item}
              onPress={() => {
                navigation.navigate(SCREENS.DETAILS, {
                  vehicleId: item.id,
                });
              }}
              onFavoritePress={id => alertBeforeUpdating(id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaViewFixed>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 18,
  },
  headerTitle: {
    paddingTop: 16,
  },
});

export default Favorites;

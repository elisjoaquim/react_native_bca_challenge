import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, CarCard } from '../components/Molecules';
import { HomeScreenProps, SCREENS } from './types';
import { FlashList } from '@shopify/flash-list';
import useVehicles from '../hooks/useVehicles';
import HeaderTitle from '../components/Molecules/HeaderTitle/HeaderTitle';
import { FilterModal, SearchModal } from '../components/Organisms';

const Home = ({ navigation }: HomeScreenProps) => {
  const {
    getAllVehicles,
    toggleFavourite,
    allCarMakes,
    allCarYears,
    minAndMaxStartingBids,
  } = useVehicles();

  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [showSearchModal, setShowSearchModal] = React.useState(false);

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={styles.safeAreaContainer}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            iconName="ListFilter"
            onPress={() => setShowFilterModal(true)}
          />
          <Button iconName="Search" onPress={() => setShowSearchModal(true)} />
        </View>
        <HeaderTitle title="Find the best vehicles deals here!" />
        <FlashList
          numColumns={2}
          data={getAllVehicles}
          renderItem={({ item }) => (
            <CarCard
              item={item}
              onPress={() => {
                navigation.navigate(SCREENS.DETAILS, {
                  vehicleId: item.id,
                });
              }}
              onFavoritePress={id => toggleFavourite(id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FilterModal
        isVisible={showFilterModal}
        availableMakes={allCarMakes}
        availableYears={allCarYears}
        availableStartingBidRanges={minAndMaxStartingBids}
        onClose={() => setShowFilterModal(false)}
      />
      <SearchModal
        isVisible={showSearchModal}
        vehicles={getAllVehicles}
        onClose={() => setShowSearchModal(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 18,
  },
  header: {
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Home;

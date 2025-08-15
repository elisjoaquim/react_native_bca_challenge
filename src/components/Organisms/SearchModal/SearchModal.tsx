import { StyleSheet, TextInput, View } from 'react-native';
import React, { useMemo } from 'react';
import { ModalContainer, VehicleListItem } from '../../Molecules';
import { ISearchModalProps } from './types';
import { Colors } from '../../../constants/Colors';
import { CustomText, Icon } from '../../Atoms';
import { FlashList } from '@shopify/flash-list';
import { filterVehicles } from '../../../helpers/StringHelpers';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SCREENS, ScreensParamList } from '../../../screens/types';

const SearchModal = ({ vehicles, onClose, ...rest }: ISearchModalProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigation = useNavigation<NavigationProp<ScreensParamList>>();

  const filteredVehicles = useMemo(
    () => filterVehicles(vehicles, searchTerm),
    [vehicles, searchTerm],
  );

  return (
    <ModalContainer {...rest} title="Search" onClose={onClose}>
      <View style={styles.container}>
        <Icon style={styles.icon} name="Search" />
        <TextInput
          autoFocus
          style={styles.textInput}
          placeholder="Search vehicles by make, model, starting bid..."
          defaultValue={searchTerm}
          onChangeText={setSearchTerm}
          returnKeyType="done"
        />
        {filteredVehicles.length > 0 ? (
          <FlashList
            data={filteredVehicles}
            renderItem={({ item }) => (
              <VehicleListItem
                item={item}
                searchTerm={searchTerm}
                onPress={() => {
                  onClose();
                  navigation.navigate(SCREENS.DETAILS, {
                    vehicleId: item.id,
                  });
                }}
              />
            )}
          />
        ) : (
          <View style={styles.noResultsContainer}>
            <Icon name="SearchX" size={60} color={Colors.gray} />
            <CustomText style={styles.noResultsText}>
              No results found
            </CustomText>
          </View>
        )}
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    marginRight: 8,
    marginBottom: 20,
    padding: 8,
    height: 40,
    borderRadius: 8,
    paddingLeft: 36,
    backgroundColor: Colors.white,
  },
  icon: {
    position: 'absolute',
    left: 8,
    top: 20,
    zIndex: 1,
    transform: [{ translateY: '-50%' }], // approximate vertical centering
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  noResultsText: {
    fontSize: 16,
  },
});

export default SearchModal;

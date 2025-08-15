/**
 *
 * TODO: Implement the logic filter to this component
 */

import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CheckboxOption, FilterOption, ModalContainer } from '../../Molecules';
import { IFilterModalProps } from './types';
import { Colors } from '../../../constants/Colors';
import { CustomText } from '../../Atoms';

const FilterModal = ({
  onClose,
  availableMakes,
  availableYears,
  availableStartingBidRanges,
  ...rest
}: IFilterModalProps) => {
  return (
    <ModalContainer onClose={onClose} {...rest} title="Filter Options">
      <ScrollView>
        <FilterOption
          label={`By Bidding Price  $${
            availableStartingBidRanges?.min || 0
          } and $${availableStartingBidRanges?.max || 0}`}
        >
          <TextInput
            style={styles.textInput}
            placeholder={`Min starts at ${
              availableStartingBidRanges?.min || 0
            }`}
            keyboardType="numeric"
          />
        </FilterOption>
        <FilterOption label="By Make">
          {availableMakes?.sort().map(make => (
            <CheckboxOption key={make} label={make} />
          ))}
        </FilterOption>

        <FilterOption label="By Year">
          {availableYears
            ?.sort((a, b) => a - b)
            .map(year => (
              <CheckboxOption key={year} label={year.toString()} />
            ))}
        </FilterOption>
      </ScrollView>
      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <CustomText>Reset filters</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton}>
          <CustomText style={styles.applyButtonText}>Apply filters</CustomText>
        </TouchableOpacity>
      </View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    flex: 1,
    marginRight: 8,
    padding: 8,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.2,
    borderColor: Colors.gray,
    padding: 16,
  },
  applyButton: {
    backgroundColor: Colors.cyanBlue,
    padding: 12,
    borderRadius: 5,
  },
  applyButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default FilterModal;

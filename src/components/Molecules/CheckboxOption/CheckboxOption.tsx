import { View } from 'react-native';
import React from 'react';
import { CustomText } from '../../Atoms';
import { ICheckboxOptionProps } from './types';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Colors } from '../../../constants/Colors';
import { StyleSheet } from 'react-native';

const CheckboxOption = ({ label }: ICheckboxOptionProps) => {
  return (
    <View style={styles.container}>
      <CustomText>{label}</CustomText>
      <View>
        <BouncyCheckbox
          fillColor={Colors.cyanBlue}
          size={20}
          isChecked={false}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default CheckboxOption;

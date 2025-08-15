import { View, StyleSheet } from 'react-native';
import React from 'react';
import { CustomText } from '../../Atoms';
import { IFilterOptionProps } from './type';
import { Colors } from '../../../constants/Colors';

const FilterOption = ({ label, children }: IFilterOptionProps) => {
  return (
    <View style={styles.optionContainer}>
      <CustomText style={styles.label}>{label}</CustomText>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.2,
    paddingBottom: 10,
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 16,
  },
});

export default FilterOption;

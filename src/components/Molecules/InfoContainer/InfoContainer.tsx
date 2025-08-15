import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CustomText } from '../../Atoms';
import { IInfoContainerProps } from './types';
import { Colors } from '../../../constants/Colors';

const InfoContainer = ({ title, children }: IInfoContainerProps) => {
  return (
    <View>
      <CustomText style={styles.infoHeaders}>{title}</CustomText>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoHeaders: { fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  content: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 0.2,
    borderColor: Colors.gray,
  },
});

export default InfoContainer;

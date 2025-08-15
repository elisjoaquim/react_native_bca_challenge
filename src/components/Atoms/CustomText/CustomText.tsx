import { StyleSheet, Text, TextProps } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/Colors';

const CustomText = ({ children, style, ...props }: TextProps) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
    fontSize: 12,
    color: Colors.darkGray,
  },
});

export default CustomText;

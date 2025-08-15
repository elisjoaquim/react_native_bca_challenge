import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from '../../Atoms/Icon/Icon';
import { IButtonProps } from './types';
import { Colors } from '../../../constants/Colors';

const Button = (props: IButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, props.style]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.iconName && (
        <Icon
          name={props.iconName}
          color={Colors.cyanBlue}
          size={20}
          fill={props.iconFill ? props.iconFill : 'transparent'}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
});

export default Button;

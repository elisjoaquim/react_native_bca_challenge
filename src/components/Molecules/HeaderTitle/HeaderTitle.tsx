import { StyleSheet } from 'react-native';
import { CustomText } from '../../Atoms';
import { IHeaderTitleProps } from './types';

const HeaderTitle = (props: IHeaderTitleProps) => {
  return (
    <CustomText style={[styles.textCTA, props.style]}>{props.title}</CustomText>
  );
};

const styles = StyleSheet.create({
  textCTA: {
    fontWeight: 'bold',
    fontSize: 28,
    flexWrap: 'wrap',
  },
});

export default HeaderTitle;

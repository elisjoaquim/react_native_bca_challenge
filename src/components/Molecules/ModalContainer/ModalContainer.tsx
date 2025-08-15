import { View, StyleSheet } from 'react-native';
import React from 'react';
import { IModalContainerProps } from './types';
import { Portal } from '@gorhom/portal';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import Button from '../Button/Button';
import { Colors } from '../../../constants/Colors';

const ModalContainer = ({
  isVisible,
  onClose,
  children,
  title,
  showCloseButton = true,
}: IModalContainerProps) => {
  return (
    <>
      {isVisible && (
        <Portal>
          <Animated.View
            style={[StyleSheet.absoluteFillObject, styles.modalContainer]}
            entering={FadeInDown}
            exiting={FadeOutDown.duration(200)}
          >
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.headerContainer}>
                <HeaderTitle title={title} />
                {showCloseButton && <Button iconName="X" onPress={onClose} />}
              </View>
              <View style={styles.contentContainer}>{children}</View>
            </SafeAreaView>
          </Animated.View>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.lightGray,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default ModalContainer;

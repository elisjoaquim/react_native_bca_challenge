import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ReText } from 'react-native-redash';
import { useCountdown } from '../../../hooks/useCountdown';
import { Colors } from '../../../constants/Colors';
import { ICountdownProps } from './types';

const Countdown = memo(({ startTime, onEnd, style }: ICountdownProps) => {
  const { days, hours, minutes, seconds } = useCountdown(startTime, onEnd);

  return (
    <View style={[styles.container, style]}>
      <ReText text={days} style={styles.text} />
      <ReText text={hours} style={styles.text} />
      <ReText text={minutes} style={styles.text} />
      <ReText text={seconds} style={styles.text} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    width: 55,
    fontWeight: 'bold',
    marginHorizontal: 6,
    marginBottom: 16,
    backgroundColor: Colors.cyanBlue,
    padding: 10,
    textAlign: 'center',
    borderRadius: 4,
    color: Colors.white,
  },
});

export default Countdown;

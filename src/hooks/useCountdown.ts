import { useEffect } from 'react';
import { useSharedValue, useDerivedValue } from 'react-native-reanimated';

export const useCountdown = (
  targetDateStr: string = new Date().toDateString(),
  onEnd?: () => void,
) => {
  const targetTime = new Date(targetDateStr).getTime();
  const remainingMs = useSharedValue(targetTime - Date.now());

  const SECOND_IN_MS = 1000;
  const MINUTE_IN_MS = SECOND_IN_MS * 60;
  const HOUR_IN_MS = MINUTE_IN_MS * 60;
  const DAY_IN_MS = HOUR_IN_MS * 24;

  const days = useDerivedValue(() => {
    return `${Math.max(0, Math.floor(remainingMs.value / DAY_IN_MS))}d`;
  });

  const hours = useDerivedValue(() => {
    return `${Math.max(
      0,
      Math.floor((remainingMs.value % DAY_IN_MS) / HOUR_IN_MS),
    )}h`;
  });

  const minutes = useDerivedValue(() => {
    return `${Math.max(
      0,
      Math.floor((remainingMs.value % HOUR_IN_MS) / MINUTE_IN_MS),
    )}m`;
  });

  const seconds = useDerivedValue(() => {
    return `${Math.max(
      0,
      Math.floor((remainingMs.value % MINUTE_IN_MS) / SECOND_IN_MS),
    )}s`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = targetTime - Date.now();

      if (diff > 0) {
        remainingMs.value = diff;
      } else {
        remainingMs.value = 0;
        if (onEnd) {
          onEnd();
        }
        clearInterval(interval);
        return;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime, remainingMs]);

  return { days, hours, minutes, seconds };
};

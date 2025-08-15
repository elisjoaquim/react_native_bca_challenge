export const getMissingTime = (
  targetDateStr: string,
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
} => {
  const now = new Date();
  const isoDateStr = transformDateToISO(targetDateStr);
  const targetDate = new Date(isoDateStr);

  let diffMs = targetDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true };
  }

  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(diffMs / msInDay);
  diffMs -= days * msInDay;

  const hours = Math.floor(diffMs / msInHour);
  diffMs -= hours * msInHour;

  const minutes = Math.floor(diffMs / msInMinute);
  diffMs -= minutes * msInMinute;

  const seconds = Math.floor(diffMs / msInSecond);

  return { days, hours, minutes, seconds, isFinished: false };
};

export const transformDateToISO = (dateStr: string): string => {
  return dateStr.replace(' ', 'T').replace(/\//g, '-');
};

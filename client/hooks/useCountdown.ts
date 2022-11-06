import { useEffect, useState } from "react";
import { utcToZonedTime } from "date-fns-tz";

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const useCountdown = (targetDate: Date) => {
  const countDownDate = targetDate.getTime();
  const defaultNow = utcToZonedTime(new Date(), "Europe/Paris");
  const [countDown, setCountDown] = useState(
    countDownDate - defaultNow.getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = utcToZonedTime(new Date(), "Europe/Paris");
      setCountDown(countDownDate - now.getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown): CountdownTime => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return { days: days === 7 ? 0 : days, hours, minutes, seconds };
};

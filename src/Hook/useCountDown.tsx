import { useEffect, useState } from 'react';

const useCountDown = ({
  initialDays,
  initialHours,
  initialMinutes,
  initialSeconds,
}: {
  initialDays: number;
  initialHours: number;
  initialMinutes: number;
  initialSeconds: number;
}) => {
  const calculateEndTime = () => {
    const now = new Date().getTime();
    const endTime =
      now +
      initialDays * 24 * 60 * 60 * 1000 +
      initialHours * 60 * 60 * 1000 +
      initialMinutes * 60 * 1000 +
      initialSeconds * 1000;
    return endTime;
  };
  const getRemainingTime = (endTime: number) => {
    const now = new Date().getTime();
    const distance = endTime - now;

    const days = Math.floor(distance / (24 * 60 * 60 * 1000));
    const hours = Math.floor(
      (distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
    );
    const minutes = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((distance % (60 * 1000)) / 1000);

    return { days, hours, minutes, seconds };
  };
  const [time, setTime] = useState(getRemainingTime(calculateEndTime()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        (prevTime: {
          days: number;
          hours: number;
          minutes: number;
          seconds: number;
        }) => {
          let { days, hours, minutes, seconds } = prevTime;

          if (seconds > 0) {
            seconds -= 1;
          } else if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          } else if (days > 0) {
            days -= 1;
            hours = 23;
            minutes = 59;
            seconds = 59;
          } else {
            clearInterval(interval);
          }
          localStorage.setItem(
            'time',
            JSON.stringify({ days, hours, minutes, seconds }),
          );
          return { days, hours, minutes, seconds };
        },
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    days: time.days,
    hours: time.hours,
    minutes: time.minutes,
    seconds: time.seconds,
  };
};

export default useCountDown;

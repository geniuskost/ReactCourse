import { useState, useEffect } from 'react';

/**
 * React hook that returns the current Date object, updating every second.
 */
export const useCurrentDate = (): Date => {
  const [date, setDate] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return date;
};

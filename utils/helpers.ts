'use strict';

import {format} from 'date-fns';

export const getFormattedDateTime = (date: Date | string) => {
  const dateTime = typeof date === 'string' ? new Date(Number(date)) : date;

  return {
    date: format(dateTime, 'EEEE, LLL do'),
    time: format(dateTime, 'h:ss aaa'),
  };
};

export const validateEmail = (value: string) => {
  return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
};

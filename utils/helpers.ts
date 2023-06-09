'use strict';

import {format} from 'date-fns';

export const getFormattedDateTime = (date: Date | string) => {
  const dateTime = typeof date === 'string' ? new Date(Number(date)) : date;

  return {
    date: format(dateTime, 'EEEE, LLL do'),
    time: format(dateTime, 'h:ss aaa'),
  };
};

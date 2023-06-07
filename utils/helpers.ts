'use strict';

import {format} from 'date-fns';

export const getFormattedDateTime = (dateTime: Date) => {
  return {
    date: format(dateTime, 'EEEE, LLL do'),
    time: format(dateTime, 'h:ss aaa'),
  };
};

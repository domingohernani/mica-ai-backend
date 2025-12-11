import { DateTime } from 'luxon';

/**
 * Returns the current date as a JS Date object
 */
const now: () => Date = () => {
  return DateTime.now().toJSDate();
};

export default now;

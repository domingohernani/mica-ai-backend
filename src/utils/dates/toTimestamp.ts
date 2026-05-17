import { DateTime } from 'luxon';

/**
 * Converts YYYY-MM-DD into a PostgreSQL-friendly timestamp (JS Date)
 */
const toTimestamp: (value: string) => Date = (value: string) => {
  return DateTime.fromISO(value).toJSDate();
};

export default toTimestamp;

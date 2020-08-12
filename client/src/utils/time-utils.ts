import moment from "moment";

const convertUtcToLocalDateString = (
  dateTime: string,
  format: string
): string => {
  const date: Date = moment.utc(dateTime).toDate();
  return moment(date).local().format(format);
};

const convertUtcToLocalDate = (dateTime: string): Date => {
  const date: Date = moment.utc(dateTime).toDate();
  return moment(date).local().toDate();
};

const getCurrentDateTimeUtcTZ = (): string => {
  return moment.utc().format();
};

const getTimeDifferenceWithCurrent = (endTime: string): number => {
  return moment(endTime).valueOf() - moment().valueOf();
};

export {
  convertUtcToLocalDateString,
  convertUtcToLocalDate,
  getCurrentDateTimeUtcTZ,
  getTimeDifferenceWithCurrent,
};

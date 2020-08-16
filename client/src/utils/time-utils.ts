import moment from "moment";

const convertUtcToLocalDateString = (
  dateTime: string,
  format: string
): string => {
  const date: Date = moment.utc(dateTime).toDate();
  return moment(date).local().format(format);
};

const getCalendarTimeFromTZ = (dateTime: string) => {
  const date: Date = moment.utc(dateTime).toDate();
  return moment(date).local().calendar();
};

const getTimeStampFromTZ = (dateTime: string) => {
  return moment(dateTime).valueOf();
};

const convertUtcToLocalDate = (dateTime: string): Date => {
  const date: Date = moment.utc(dateTime).toDate();
  return moment(date).local().toDate();
};

const getCurrentDateTimeUtcTZ = (): string => {
  return moment.utc().format();
};

const getTimeDifferenceWithCurrent = (
  endTime: string,
  param: "minutes" | "days"
): number => {
  return moment(endTime).diff(moment(), param);
};

export {
  convertUtcToLocalDateString,
  convertUtcToLocalDate,
  getCurrentDateTimeUtcTZ,
  getTimeDifferenceWithCurrent,
  getCalendarTimeFromTZ,
  getTimeStampFromTZ,
};

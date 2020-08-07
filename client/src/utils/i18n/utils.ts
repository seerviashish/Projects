import { LocaleType } from "./LocaleProvider";

const supportedLocale: Array<LocaleType> = [
  {
    id: 1,
    name: "English",
    locale: "en",
    isSupported: true,
  },
  {
    id: 2,
    name: "Hindi",
    locale: "hi",
    isSupported: true,
  },
  {
    id: 3,
    name: "Gujarati",
    locale: "gu",
    isSupported: false,
  },
];

export default supportedLocale;

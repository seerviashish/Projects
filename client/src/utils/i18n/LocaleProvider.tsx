import React, { Component, ReactNode } from "react";
import { I18nProvider } from "@lingui/react";
import supportedLanguage from "./utils";

import enCatalog from "./locales/en/messages";
import hiCatalog from "./locales/hi/messages";
import guCatalog from "./locales/gu/messages";

import { Client } from "src/db/models/Client";
import {
  getByKey,
  save as saveClientDB,
} from "src/db/repository/ClientRepository";
import { cdb } from "src/db/ClientDB";
import { LOCALE_KEY } from "src/constants/keys";

const DEFAULT_LOCALE_EN: string = "en";
const LOCALE_HI: string = "hi";
const LOCALE_GU: string = "gu";

export type LocaleContextType = {
  resolved?: boolean;
  loading?: boolean;
  error?: any;
  locale?: string;
  changeLocale?: (name: string) => void;
  localeList?: Array<LocaleType>;
};

export type LocaleType = {
  id: number;
  name: string;
  locale: string;
  isSupported: boolean;
};

const defaultState = {
  loading: false,
  resolved: false,
  locale: "en",
  error: null,
  catalog: undefined,
  localeList: supportedLanguage,
};

const Context = React.createContext<LocaleContextType>(defaultState);

const { Consumer, Provider } = Context;

export { Consumer, Context };

type Props = {
  children: ReactNode;
  locale?: string;
};

type State = {
  resolved: boolean;
  loading: boolean;
  locale: string;
  error?: any;
  catalogs?: any;
};

class LocaleProvider extends Component<Props, State> {
  readonly state: State = {
    resolved: false,
    loading: false,
    locale: DEFAULT_LOCALE_EN,
    error: null,
    catalogs: undefined,
  };

  changeLocale = (name: string) => {
    this.loadCatalog(name).then((catalog) => {
      this.setState(
        (state) => ({
          catalogs: {
            ...state.catalogs,
            [name]: catalog,
          },
          locale: name,
        }),
        () => {
          this.storeAppLocale(name);
        }
      );
    });
  };

  systemLangauge = (): string | undefined => {
    if (window && window.navigator && window.navigator.language) {
      const lang = window.navigator.language;
      const langSplit = lang.replace("-", "_").toLowerCase().split("_");

      const supportLang: any = supportedLanguage
        .filter((lang: LocaleType) => lang.isSupported)
        .map((lang: LocaleType) => {
          return lang.locale;
        });
      if (
        langSplit &&
        langSplit.length > 0 &&
        supportLang &&
        supportLang.includes(langSplit[0])
      ) {
        return langSplit[0];
      }
    }
    return undefined;
  };

  loadCatalog = async (language: string): Promise<any> => {
    if (language === DEFAULT_LOCALE_EN) {
      return enCatalog;
    }
    if (language === LOCALE_HI) {
      return hiCatalog;
    }
    if (language === LOCALE_GU) {
      return guCatalog;
    }
  };

  getAppLocale = async (): Promise<string | undefined> => {
    const client: Client | undefined = await getByKey(LOCALE_KEY, cdb);
    const systemLanguage: string | undefined = this.systemLangauge();
    if (client) {
      return client.value;
    }
    if (systemLanguage) {
      return systemLanguage;
    }
    return undefined;
  };

  private storeAppLocale = async (locale: string): Promise<any> => {
    return await saveClientDB(new Client(LOCALE_KEY, locale), cdb);
  };

  componentDidMount() {
    this.getAppLocale()
      .then(async (appLocale: string | undefined) => {
        const locale = appLocale ? appLocale : DEFAULT_LOCALE_EN;
        this.loadCatalog(locale).then((catalog) => {
          this.setState((state) => ({
            catalogs: {
              ...state.catalogs,
              [locale]: catalog,
            },
            locale,
            resolved: true,
          }));
        });
      })
      .catch((error) => {
        this.setState({ error, resolved: true });
      });
  }

  render() {
    const { catalogs, locale, resolved } = this.state;
    return (
      resolved && (
        <Provider
          value={{
            ...this.state,
            changeLocale: this.changeLocale,
            localeList: supportedLanguage,
          }}
        >
          <I18nProvider language={locale} catalogs={catalogs}>
            {this.props.children}
          </I18nProvider>
        </Provider>
      )
    );
  }
}

export default LocaleProvider;

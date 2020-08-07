import React, { ReactNode } from "react";
import { Theme, MuiThemeProvider } from "@material-ui/core/styles";
import { Client } from "src/db/models/Client";
import {
  getByKey,
  save as saveClientDB,
} from "src/db/repository/ClientRepository";
import { cdb } from "src/db/ClientDB";
import { theme as darkTheme } from "./templates/dark";
import { theme as defaultTheme } from "./templates/default";
import { THEME_KEY } from "src/constants/keys";

const DEFAULT_THEME = "default";
const DARK_THEME = "dark";

export type ThemeContextType = {
  resolved?: boolean;
  loading?: boolean;
  error?: any;
  mode: string;
  theme?: Theme;
  changeThemeMode?: (mode: string) => boolean;
  themeList?: Array<string>;
};

const defaultState = {
  resolved: false,
  loading: false,
  error: null,
  mode: DEFAULT_THEME,
  theme: defaultTheme,
  changeThemeMode: undefined,
  themeList: [DEFAULT_THEME, DARK_THEME],
};

const Context = React.createContext<ThemeContextType>(defaultState);

const { Consumer, Provider } = Context;

export { Consumer, Context };

type Props = {
  children: ReactNode;
};

type State = {
  resolved: boolean;
  loading: boolean;
  mode: string;
  theme: Theme;
  error?: any;
};

class ThemeProvider extends React.Component<Props, State> {
  readonly state: State = {
    resolved: false,
    loading: false,
    mode: DEFAULT_THEME,
    theme: defaultTheme,
    error: null,
  };

  changeThemeMode = (mode: string): boolean => {
    if (mode === DARK_THEME || mode === DEFAULT_THEME) {
      this.storeAppThemeMode(mode)
        .then(() => {
          let theme = defaultTheme;
          if (mode === DARK_THEME) {
            theme = darkTheme;
          }
          this.setState({
            mode,
            theme,
          });
        })
        .catch((error) => {
          this.setState({
            error,
          });
          return false;
        });
    }
    return false;
  };

  private storeAppThemeMode = async (mode: string): Promise<any> => {
    return await saveClientDB(new Client(THEME_KEY, mode), cdb);
  };

  getAppTheme = async (): Promise<string> => {
    const client: Client | undefined = await getByKey(THEME_KEY, cdb);
    if (client) {
      return client.value;
    }
    return DEFAULT_THEME;
  };

  componentDidMount() {
    this.getAppTheme()
      .then((mode) => {
        let theme = defaultTheme;
        if (mode === DARK_THEME) {
          theme = darkTheme;
        }
        this.setState(
          {
            mode,
            theme,
          },
          () => {
            this.setState({ resolved: true });
          }
        );
      })
      .catch((error) => {
        this.setState({ error }, () => {
          this.setState({ resolved: true });
        });
      });
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { mode, resolved, theme } = nextState;
    if (
      mode !== this.state.mode ||
      theme !== this.state.theme ||
      resolved !== this.state.resolved
    ) {
      return true;
    }
    return false;
  }

  render() {
    const { resolved, theme } = this.state;
    return (
      resolved && (
        <Provider
          value={{
            ...this.state,
            changeThemeMode: this.changeThemeMode,
            themeList: [DARK_THEME, DEFAULT_THEME],
          }}
        >
          <MuiThemeProvider theme={theme}>
            {this.props.children}
          </MuiThemeProvider>
        </Provider>
      )
    );
  }
}

export default ThemeProvider;

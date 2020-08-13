import React, { ReactNode } from "react";
import { cdb } from "src/db/ClientDB";
import {
  deleteByKey as deleteClientByKey,
  getByKey as getClientByKey,
  save as saveClientDB,
} from "src/db/repository/ClientRepository";
import { Client } from "src/db/models/Client";
import { USER_KEY } from "src/constants/keys";
import appNetwork from "src/utils/network";
import apis from "src/constants/api";
import { withStyles, createStyles, WithStyles } from "@material-ui/styles";
import {
  Theme,
  CssBaseline,
  Container,
  LinearProgress,
} from "@material-ui/core";
import { getTimeDifferenceWithCurrent } from "../time-utils";
import { Response, ResponseStatus, ResponseError } from "../TypeDefinition";

export type Token = {
  expires: string;
  token: string;
};

export type Tokens = {
  access: Token;
  refresh: Token;
};

export type UserInfo = {
  balance: number;
  email: string;
  id: string;
  name: string;
  role: string;
};

export type User = {
  tokens: Tokens;
  user: UserInfo;
};

export type SignInDetail = {
  email: string;
  password: string;
};

export type TokenValidStatus = {
  access: boolean;
  refresh: boolean;
};

export type SignUpDetail = {
  name: string;
  email: string;
  password: string;
};

export enum SessionState {
  FAILED,
  AUTHENTICATED,
  REFRESHED_AUTH, // refresh-token
  UNAUTHENTICATED,
}

export type SessionStateDetail = {
  type: SessionState;
  data?: User;
};

export type SessionContextType = {
  resolved: boolean;
  loading: boolean;
  error?: any;
  user?: User;
  isAdmin?: () => boolean;
  canSendMessage?: () => boolean;
  canVideoCall?: () => boolean;
  canCall?: () => boolean;
  isAuthenticated: (user: User | undefined) => TokenValidStatus;
  signIn?: (signInDetail: SignInDetail) => Promise<Response>;
  signUp?: (signUpDetail: SignUpDetail) => Promise<any>;
  refreshToken?: () => Promise<any>;
  signOut?: () => Promise<void>;
  updateUserState?: () => Promise<void>;
};

const defaultContext: SessionContextType = {
  loading: true,
  resolved: false,
  isAuthenticated: (user: User | undefined): TokenValidStatus => {
    return { access: false, refresh: false };
  },
};

const Context = React.createContext<SessionContextType>(defaultContext);

const { Provider, Consumer } = Context;

export { Context, Provider, Consumer };

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: 0,
      padding: 0,
      maxWidth: "100%",
    },
    loading: {
      height: "0.5rem",
      width: "100%",
    },
  });

type Props = {
  children: ReactNode;
};

type State = {
  resolved: boolean;
  loading: boolean;
  autoLogin: boolean;
  user?: User;
};
class SessionProvider extends React.Component<
  Props & WithStyles<typeof styles>,
  State
> {
  readonly state: State = {
    resolved: false,
    loading: true,
    autoLogin: true,
    user: undefined,
  };

  private getUserDetailDB = async (): Promise<User | undefined> => {
    try {
      const clientResponse: Client = await getClientByKey(USER_KEY, cdb);
      return clientResponse.value as User;
    } catch (error) {
      return undefined;
    }
  };
  /**
   * @param {Token} token
   * @returns {boolean} true if token is expired
   */
  private isTokenExpired = (token: Token): boolean => {
    return getTimeDifferenceWithCurrent(token.expires) <= 0;
  };

  /**
   *
   * @param {User | undefined} user
   * @returns {TokenValidStatus}
   * if access: true if access token is valid and
   * refresh: true if refresh token is valid
   */
  isUserTokenValid = (user: User | undefined): TokenValidStatus => {
    if (!user) {
      return { access: false, refresh: false };
    }
    const access: boolean = !this.isTokenExpired(user.tokens.access);
    const refresh: boolean = !this.isTokenExpired(user.tokens.refresh);
    return { access, refresh } as TokenValidStatus;
  };

  refreshToken = async (user: User): Promise<Tokens | undefined> => {
    try {
      const refreshToken: string = user.tokens.refresh.token;
      const response = await appNetwork.post(apis.REFRESH_TOKEN, {
        refreshToken,
      });
      return response.data ? (response.data as Tokens) : undefined;
    } catch (error) {
      return undefined;
    }
  };

  signOut = async (): Promise<void> => {
    try {
      await deleteClientByKey(USER_KEY, cdb);
    } finally {
      this.setState({
        user: undefined,
      });
    }
  };

  private getStateDetailBySession = (
    sessionStateDetail: SessionStateDetail
  ): State => {
    const state: State = { ...this.state };
    if (sessionStateDetail.type === SessionState.AUTHENTICATED) {
      return {
        ...state,
        user: sessionStateDetail.data,
        resolved: true,
        loading: false,
      };
    } else if (sessionStateDetail.type === SessionState.REFRESHED_AUTH) {
      return {
        ...state,
        user: sessionStateDetail.data,
        resolved: true,
        loading: false,
      };
    } else if (sessionStateDetail.type === SessionState.UNAUTHENTICATED) {
      return {
        ...state,
        user: undefined,
        autoLogin: true,
        resolved: true,
        loading: false,
      };
    } else {
      return {
        ...state,
        user: undefined,
        autoLogin: true,
        resolved: true,
        loading: false,
      };
    }
  };

  updateUserState = async (): Promise<void> => {
    const sessionStateDetail: SessionStateDetail = await this.sessionStateData();
    const state: State = this.getStateDetailBySession(sessionStateDetail);
    this.setState({ ...state });
  };

  signIn = async (signInDetail: SignInDetail): Promise<Response> => {
    try {
      const response: any = await appNetwork.post(apis.SIGN_IN, signInDetail);
      const user: User = response && response.data ? response.data : undefined;
      const { access, refresh } = this.isUserTokenValid(user);
      if (access && refresh) {
        const dbResponse = await saveClientDB(new Client(USER_KEY, user), cdb);
        if (!dbResponse) {
          throw new Error("User detail is not saved in database");
        }
        return { status: ResponseStatus.SUCCESS, data: user };
      } else {
        throw new Error("User token detail is not valid");
      }
    } catch (err) {
      const error: ResponseError = {
        trace: err,
        message:
          err && err.message
            ? err.message
            : "Unknown error ocurred during sign in",
      };
      return { status: ResponseStatus.FAILED, error };
    }
  };

  signUp = async (signUpDetail: SignUpDetail): Promise<Response> => {
    try {
      const response: any = await appNetwork.post(apis.SIGN_UP, signUpDetail);
      const user: User = response && response.data ? response.data : undefined;
      const { access, refresh } = this.isUserTokenValid(user);
      if (access && refresh) {
        const dbResponse = await saveClientDB(new Client(USER_KEY, user), cdb);
        if (!dbResponse) {
          throw new Error("User detail is not saved in database");
        }
        return { status: ResponseStatus.SUCCESS, data: user };
      } else {
        throw new Error("User token detail is not valid");
      }
    } catch (err) {
      const error: ResponseError = {
        trace: err,
        message:
          err && err.message
            ? err.message
            : "Unknown error ocurred during sign up",
      };
      return { status: ResponseStatus.FAILED, error };
    }
  };

  sessionStateData = async (): Promise<SessionStateDetail> => {
    let sessionStateDetail: SessionStateDetail = {
      type: SessionState.UNAUTHENTICATED,
    };
    try {
      const user: User | undefined = await this.getUserDetailDB();
      const { access, refresh }: TokenValidStatus = this.isUserTokenValid(user);
      if (access && refresh) {
        sessionStateDetail.type = SessionState.AUTHENTICATED;
        sessionStateDetail.data = user;
      } else if (!access && refresh && user) {
        const newTokens: Tokens | undefined = await this.refreshToken(user);
        if (!newTokens) {
          throw new Error("Failed to refresh token.");
        }
        const newUser: User = { ...user, tokens: { ...newTokens } };
        await saveClientDB(new Client(USER_KEY, newUser), cdb);
        sessionStateDetail.type = SessionState.REFRESHED_AUTH;
        sessionStateDetail.data = user;
      } else {
        await deleteClientByKey(USER_KEY, cdb);
        sessionStateDetail.type = SessionState.UNAUTHENTICATED;
      }
      return sessionStateDetail;
    } catch (error) {
      sessionStateDetail.type = SessionState.FAILED;
      return sessionStateDetail;
    }
  };

  componentDidMount() {
    this.sessionStateData().then((sessionStateDetail: SessionStateDetail) => {
      const state: State = this.getStateDetailBySession(sessionStateDetail);
      this.setState({ ...state });
    });
  }
  render() {
    const { loading, resolved } = this.state;
    const { classes } = this.props;
    if (!resolved) {
      let child: ReactNode = "";
      if (loading) {
        child = <LinearProgress className={classes.loading} />;
      }
      return (
        <React.Fragment>
          <CssBaseline />
          <Container className={classes.container} component="section">
            {child}
          </Container>
        </React.Fragment>
      );
    }
    return (
      <Provider
        value={{
          ...this.state,
          isAuthenticated: this.isUserTokenValid,
          signOut: this.signOut,
          signIn: this.signIn,
          signUp: this.signUp,
          updateUserState: this.updateUserState,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default withStyles(styles)(SessionProvider);

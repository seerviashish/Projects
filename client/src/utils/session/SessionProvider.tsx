import React, { ReactNode } from "react";

export type SessionDetail = {
  token: string;
  expire: Date;
  clientId: string;
};

export type SignInDetail = {
  email: string;
  password: string;
};

export type SignUpDetail = {
  name: string;
  email: string;
  password: string;
};

export type SessionContextType = {
  signIn?: (signInDetail: SignInDetail) => Promise<any>;
  signUp?: (signUpDetail: SignUpDetail) => Promise<any>;
  refreshToken?: () => Promise<any>;
  signOut?: () => Promise<any>;
};

const defaultContext = {
  signIn: undefined,
  signUp: undefined,
  refreshToken: undefined,
  signOut: undefined,
};

const Context = React.createContext<SessionContextType>(defaultContext);

const { Provider, Consumer } = Context;

export { Context, Provider };

type Props = {
  children: ReactNode;
};

type State = {};

class SessionProvider extends React.Component<Props, State> {
  readonly state: State = {};
  render() {
    return <Provider value={{ ...this.state }}>{this.props.children}</Provider>;
  }
}

export default SessionProvider;

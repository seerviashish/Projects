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
  resolved: boolean;
  loading: boolean;
  error?: any;
  session?: SessionDetail;
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
  loading: true,
  resolved: false,
  session: undefined,
};

const Context = React.createContext<SessionContextType>(defaultContext);

const { Provider, Consumer } = Context;

export { Context, Provider, Consumer };

type Props = {
  children: ReactNode;
};

type State = {
  resolved: boolean;
  loading: boolean;
};

class SessionProvider extends React.Component<Props, State> {
  readonly state: State = {
    resolved: false,
    loading: true,
  };
  componentDidMount() {
    this.setState({ resolved: true, loading: false });
  }
  render() {
    return <Provider value={{ ...this.state }}>{this.props.children}</Provider>;
  }
}

export default SessionProvider;

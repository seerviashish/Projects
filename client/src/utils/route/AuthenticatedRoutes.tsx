import React, { ReactElement } from "react";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";
import { Consumer as SessionConsumer } from "../session/SessionProvider";
import { SIGN_IN } from "src/constants/routes";

type Props = {
  children?: (props: RouteComponentProps<any>) => ReactElement;
  component: (props: RouteComponentProps<any>) => ReactElement;
  path?: string;
  exact?: boolean;
};

const AuthenticatedRoutes: React.FC<Props> = ({
  children,
  component,
  path,
  exact,
}) => {
  const ChildComponent = children || component;
  return (
    <SessionConsumer>
      {({ session, loading }) => {
        return (
          !loading && (
            <Route
              path={path}
              exact={exact}
              render={(props: any) => {
                return session ? (
                  <ChildComponent {...props} />
                ) : (
                  <Redirect
                    to={{
                      pathname: SIGN_IN,
                      state: { from: props.location },
                    }}
                  />
                );
              }}
            />
          )
        );
      }}
    </SessionConsumer>
  );
};

export default AuthenticatedRoutes;

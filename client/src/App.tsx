import React, { lazy } from "react";
import AppThemeProvider from "./utils/theme";
import LocaleProvider from "./utils/i18n";
import SessionProvider from "./utils/session/SessionProvider";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { HOME, SIGN_IN, SIGN_UP } from "./constants/routes";
import WaitingComponent from "./components/WaitingComponent";
import AuthenticatedRoutes from "./utils/route/AuthenticatedRoutes";
import UnauthenticatedRoutes from "./utils/route/UnauthenticatedRoutes";

const HomePage = lazy(() =>
  import(/* webpackChunkName: 'HomePage' */ "./pages/HomePage")
);

const SignInPage = lazy(() =>
  import(/* webpackChunkName: 'SignInPage' */ "./pages/SignInPage")
);

const SignUpPage = lazy(() =>
  import(/* webpackChunkName: 'SignInPage' */ "./pages/SignUpPage")
);

const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <LocaleProvider>
        <SessionProvider>
          <Router>
            <Switch>
              <UnauthenticatedRoutes
                exact
                path={SIGN_IN}
                component={WaitingComponent(SignInPage)}
              />
              <UnauthenticatedRoutes
                exact
                path={SIGN_UP}
                component={WaitingComponent(SignUpPage)}
              />
              <AuthenticatedRoutes
                exact
                path={HOME}
                component={WaitingComponent(HomePage)}
              />
            </Switch>
          </Router>
        </SessionProvider>
      </LocaleProvider>
    </AppThemeProvider>
  );
};

export default App;

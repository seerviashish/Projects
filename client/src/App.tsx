import React, { lazy } from "react";
import AppThemeProvider from "./utils/theme";
import LocaleProvider from "./utils/i18n";
import SessionProvider from "./utils/session/SessionProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HOME, SIGN_IN, SIGN_UP, ERROR } from "./constants/routes";
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

const ErrorPage = lazy(() =>
  import(/* webpackChunkName: 'SignInPage' */ "./pages/ErrorPage")
);

const App: React.FC = () => {
  return (
    <AppThemeProvider>
      <LocaleProvider>
        <SessionProvider>
          <Router>
            <Switch>
              <Route
                exact
                path={ERROR}
                component={WaitingComponent(ErrorPage)}
              />
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

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import AppThemeProvider from "./utils/theme";
import LocaleProvider from "./utils/i18n";
import SessionProvider from "./utils/session/SessionProvider";

ReactDOM.render(
  <AppThemeProvider>
    <LocaleProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </LocaleProvider>
  </AppThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

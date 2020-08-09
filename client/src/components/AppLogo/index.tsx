import React, { PureComponent } from "react";
import logo from "./logo.svg";

type AppLogoProps = {
  height: string;
  width: string;
  style: object;
};

export default class AppLogo extends PureComponent<AppLogoProps> {
  render(): React.ReactNode {
    const { height, width, style } = this.props;
    return (
      <img
        src={logo}
        alt="Message App Logo"
        style={{ height, width, ...style }}
      />
    );
  }
}

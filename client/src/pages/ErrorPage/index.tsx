import React from "react";
import "./index.css";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";

type Props = {};
type State = {};

const styles = (theme: Theme) => createStyles({});

class ErrorPage extends React.Component<
  Props & WithStyles<typeof styles>,
  State
> {
  readonly state: State = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <div>ErrorPage</div>;
  }
}

export default withStyles(styles)(ErrorPage);

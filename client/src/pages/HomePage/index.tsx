import React from "react";
import "./index.css";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";

type Props = {};
type State = {};

const styles = (theme: Theme) => createStyles({});

class HomePage extends React.Component<
  Props & WithStyles<typeof styles>,
  State
> {
  readonly state: State = {};

  componentDidMount() {
    console.log("PRops==>", this.props);
  }

  componentWillUnmount() {}

  render() {
    return <div>HomePage</div>;
  }
}

export default withStyles(styles)(HomePage);

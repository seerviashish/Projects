import React from "react";
import "./App.css";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";

type Props = {};
type State = {};

const styles = (theme: Theme) => createStyles({});

class App extends React.Component<Props & WithStyles<typeof styles>, State> {
  readonly state: State = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div className="main">
        <div className="middle">
          <div className="small"></div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);

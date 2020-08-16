import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  CssBaseline,
  Container,
  AppBar,
} from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";

type Props = {};
type State = {};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: 0,
      padding: 0,
      maxWidth: "100%",
    },
  });

class MessagePage extends React.Component<
  Props & WithStyles<typeof styles> & RouteComponentProps,
  State
> {
  readonly state: State = {};

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.container} component="div">
          <AppBar position="static"></AppBar>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(MessagePage));

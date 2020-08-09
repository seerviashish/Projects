import React from "react";
import "./index.css";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  CssBaseline,
  Container,
  Typography,
  Button,
  Paper,
  Avatar,
  SvgIcon,
} from "@material-ui/core";
import AppLogo from "src/components/AppLogo";
import { Trans } from "@lingui/react";

type Props = {};
type State = {};

const styles = (theme: Theme) =>
  createStyles({
    formSection: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(2),
        marginTop: "10vh",
        height: "70vh",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
        [theme.breakpoints.between("sm", "md")]: {
          width: "100%",
        },
        [theme.breakpoints.between("md", "lg")]: {
          width: "90%",
        },
        [theme.breakpoints.between("lg", "xl")]: {
          width: "60%",
        },
        [theme.breakpoints.up("xl")]: {
          width: "50%",
        },
      },
    },
  });

class SignInPage extends React.Component<
  Props & WithStyles<typeof styles>,
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
        <Container fixed className={classes.formSection} component="section">
          <Paper elevation={3} component="div">
            <AppLogo
              height="100px"
              width="100px"
              style={{ display: "block", margin: "10px auto" }}
            />
            <Typography variant="h4" gutterBottom align="center">
              <Trans id="WelcomeToMessageApp" />
            </Typography>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignInPage);

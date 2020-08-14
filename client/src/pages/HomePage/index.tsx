import React from "react";
import "./index.css";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  LinearProgress,
  Paper,
  Tabs,
  Tab,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import DonutSmallIcon from "@material-ui/icons/DonutSmall";
import CallIcon from "@material-ui/icons/Call";
import { Trans } from "@lingui/react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Consumer as SessionConsumer,
  User,
} from "src/utils/session/SessionProvider";

enum MenuItemType {
  Profile = "Profile",
  Settings = "Settings",
  LogOut = "LogOut",
}

type Props = {
  signOut?: () => Promise<void>;
  user?: User;
};

type State = {
  anchorEl?: HTMLElement;
  tabIndex: number;
};

const styles = (theme: Theme) =>
  createStyles({
    loading: {},
    container: {
      margin: 0,
      padding: 0,
      maxWidth: "100%",
      height: "100vh",
      position: "relative",
    },
    appbar: {
      position: "fixed",
      top: 0,
      height: 64,
    },
    tabContainer: {
      width: "100%",
      position: "fixed",
      height: 64,
      bottom: 0,
      maxWidth: "100%",
      backgroundColor: theme.palette.primary.light,
      "& *": {
        textTransform: "none",
      },
    },
    main: {
      borderRadius: 0,
      height: "100vh",
      backgroundColor: "grey",
      overflowX: "scroll",
      padding: "64px 0",
    },
    title: {
      flexGrow: 1,
      margin: theme.spacing(2),
    },
    menuItem: {
      marginRight: theme.spacing(5),
    },
  });

class HomePage extends React.Component<
  Props & WithStyles<typeof styles>,
  State
> {
  readonly state: State = {
    tabIndex: 0,
  };

  componentDidMount() {
    console.log("PRops==>", this.props);
  }

  componentWillUnmount() {}

  handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleTabChange = (event: React.ChangeEvent<{}>, newTabIndex: number) => {
    this.setState({ tabIndex: newTabIndex });
  };

  handleMenuClose = (menuItem?: string) => () => {
    if (menuItem === MenuItemType.Profile) {
    } else if (menuItem === MenuItemType.Settings) {
    } else if (menuItem === MenuItemType.LogOut) {
      const { signOut } = this.props;
      this.setState(
        {
          anchorEl: undefined,
        },
        () => {
          signOut && signOut();
        }
      );
    } else {
      this.setState({
        anchorEl: undefined,
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, tabIndex } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.container} component="div">
          <AppBar position="fixed" className={classes.appbar}>
            <Toolbar>
              <Typography
                variant="h6"
                className={classes.title}
                title="Application Title"
              >
                <Trans id="Message" />
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
                title="Menu Icon Button"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose()}
              >
                {["Profile", "Settings", "LogOut"].map(
                  (menuItem: string, index: number) => {
                    return (
                      <MenuItem
                        key={`${index}-menuItem`}
                        className={classes.menuItem}
                        onClick={this.handleMenuClose(menuItem)}
                      >
                        <Trans id={menuItem} />
                      </MenuItem>
                    );
                  }
                )}
              </Menu>
            </Toolbar>
          </AppBar>
          <Paper
            className={classes.main}
            component="main"
            elevation={0}
            variant="outlined"
          >
            <p>a</p>
          </Paper>
          <Paper square className={classes.tabContainer} component="footer">
            <Tabs
              value={tabIndex}
              onChange={this.handleTabChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="tab buttons"
            >
              <Tab icon={<ChatIcon />} label="Chat" />
              <Tab icon={<DonutSmallIcon />} label="Status" />
              <Tab icon={<CallIcon />} label="Calls" />
            </Tabs>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

class HomePageWrapper extends React.Component<
  WithStyles<typeof styles> & RouteComponentProps
> {
  render() {
    const { classes } = this.props;
    return (
      <SessionConsumer>
        {({ loading, signOut, user }) => {
          if (loading) {
            return <LinearProgress className={classes.loading} />;
          }
          return <HomePage {...this.props} signOut={signOut} user={user} />;
        }}
      </SessionConsumer>
    );
  }
}

export default withRouter(withStyles(styles)(HomePageWrapper));

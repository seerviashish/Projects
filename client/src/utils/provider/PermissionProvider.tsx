import React, { ReactNode } from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Container,
  CssBaseline,
  LinearProgress,
  Paper,
  Typography,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { cdb } from "src/db/ClientDB";

export type AppPermission = {
  key: string;
  name: string;
  required: boolean;
  runtime: boolean;
  info: string;
  isAllowed: boolean;
};

export type PermissionContextType = {
  resolved?: boolean;
  loading: boolean;
  error?: any;
  permissions: AppPermission[];
  requestForPermission?: (key: string) => Promise<any>;
};

const requiredPermissions: AppPermission[] = [
  {
    key: "location",
    name: "Location",
    required: false,
    runtime: true,
    info:
      "Please allow Location permission for this site. This will be used to find groups or person nearest to you nearest.",
    isAllowed: false,
  },
  {
    key: "camera",
    name: "Camera",
    required: false,
    runtime: true,
    info:
      "Please allow Camera permission for this site. This will be used for video call service.",
    isAllowed: false,
  },
  {
    key: "microphone",
    name: "Microphone",
    required: false,
    runtime: true,
    info:
      "Please allow Microphone permission for this site. This will be used for voice call or voice message.",
    isAllowed: false,
  },
  {
    key: "notification",
    name: "Notification",
    required: false,
    runtime: true,
    info:
      "Please allow Notification permission for this site to get notified during receive message.",
    isAllowed: false,
  },
  {
    key: "cookie",
    name: "Cookie",
    required: true,
    runtime: false,
    info:
      "Please allow cookie permission for this site. This website uses cookies We use cookies to personalize content.",
    isAllowed: false,
  },
  {
    key: "app-storage",
    name: "LocalStorage and SessionStorage",
    required: true,
    runtime: false,
    info:
      "Please allow permission to store data in LocalStorage, IndexedDB, SessionStorage. This website uses local storage, session storage and database to personalize content.",
    isAllowed: false,
  },
];

const defaultContext: PermissionContextType = {
  resolved: undefined,
  loading: true,
  error: undefined,
  permissions: [],
};

const Context = React.createContext<PermissionContextType>(defaultContext);

const { Consumer, Provider } = Context;

export { Consumer, Context };

type Props = {
  children: ReactNode;
};

type State = {
  resolved: boolean;
  loading: boolean;
  error?: any;
  permissions: AppPermission[];
  online: boolean;
};

const styles = (theme: Theme) =>
  createStyles({
    container: {
      margin: 0,
      padding: 0,
      maxWidth: "100%",
    },
    loading: {
      height: "0.5rem",
      width: "100%",
    },
    paperSection: {
      margin: "10vh auto",
      padding: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        width: "85%",
      },
      [theme.breakpoints.between("sm", "md")]: {
        width: "80%",
      },
      [theme.breakpoints.between("md", "xl")]: {
        width: "50%",
      },
      [theme.breakpoints.up("xl")]: {
        width: "50%",
      },
    },
  });

class PermissionProvider extends React.Component<
  Props & WithStyles<typeof styles>,
  State
> {
  readonly state: State = {
    resolved: false,
    online: true,
    loading: true,
    error: null,
    permissions: [],
  };

  isOnline = (): boolean => {
    try {
      return navigator && navigator.onLine;
    } catch (error) {
      return false;
    }
  };

  isCookieEnabled = (): boolean => {
    try {
      return navigator && navigator.cookieEnabled;
    } catch (error) {
      return false;
    }
  };

  isDBOpen = async (): Promise<boolean> => {
    try {
      await cdb.open();
      return true;
    } catch (error) {
      return false;
    }
  };

  isAppStorageAllowed = async (): Promise<boolean> => {
    try {
      let localAnsSessionStorage = false;
      if (window.localStorage && window.sessionStorage) {
        localAnsSessionStorage = true;
      }
      const database = await this.isDBOpen();
      return localAnsSessionStorage && database;
    } catch (error) {
      return false;
    }
  };

  isLocationPermissionAllowed = async (): Promise<boolean> => {
    try {
      const permissionState = await navigator.permissions.query({
        name: "geolocation",
      });
      return permissionState.state === "granted";
    } catch (error) {
      return false;
    }
  };

  isCameraPermissionAllowed = async (): Promise<boolean> => {
    try {
      const permissionState = await navigator.permissions.query({
        name: "camera",
      });
      return permissionState.state === "granted";
    } catch (error) {
      return false;
    }
  };

  isMicrophonePermissionAllowed = async (): Promise<boolean> => {
    try {
      const permissionState = await navigator.permissions.query({
        name: "microphone",
      });
      return permissionState.state === "granted";
    } catch (error) {
      return false;
    }
  };

  isNotificationsPermissionAllowed = async (): Promise<boolean> => {
    try {
      const permissionState = await navigator.permissions.query({
        name: "notifications",
      });
      return permissionState.state === "granted";
    } catch (error) {
      return false;
    }
  };

  componentDidMount() {
    Promise.allSettled([
      this.isOnline(),
      this.isCookieEnabled(),
      this.isAppStorageAllowed(),
      this.isLocationPermissionAllowed(),
      this.isCameraPermissionAllowed(),
      this.isMicrophonePermissionAllowed(),
      this.isNotificationsPermissionAllowed(),
    ])
      .then((permissionResponse) => {
        const isOnline: boolean =
          permissionResponse[0].status === "fulfilled" &&
          permissionResponse[0].value;
        const permissions = requiredPermissions.map(
          (permissionObj: AppPermission) => {
            if (permissionObj.key === "cookie") {
              permissionObj.isAllowed =
                permissionResponse[1].status === "fulfilled"
                  ? permissionResponse[1].value
                  : false;
            }
            if (permissionObj.key === "app-storage") {
              permissionObj.isAllowed =
                permissionResponse[2].status === "fulfilled" &&
                permissionResponse[2].value;
            }
            if (permissionObj.key === "location") {
              permissionObj.isAllowed =
                permissionResponse[3].status === "fulfilled" &&
                permissionResponse[3].value;
            }
            if (permissionObj.key === "camera") {
              permissionObj.isAllowed =
                permissionResponse[4].status === "fulfilled" &&
                permissionResponse[4].value;
            }
            if (permissionObj.key === "microphone") {
              permissionObj.isAllowed =
                permissionResponse[5].status === "fulfilled" &&
                permissionResponse[5].value;
            }
            if (permissionObj.key === "notification") {
              permissionObj.isAllowed =
                permissionResponse[6].status === "fulfilled" &&
                permissionResponse[6].value;
            }
            return permissionObj;
          }
        );
        const isResolved: boolean =
          permissions.filter(
            (data: AppPermission) => data.required && !data.isAllowed
          ).length === 0;
        this.setState((prevState: State, props: Props) => {
          return {
            online: isOnline,
            permissions,
            resolved: isResolved,
            loading: false,
          };
        });
      })
      .catch((error: any) => {
        this.setState((prevState: State, props: Props) => {
          return {
            resolved: false,
            loading: false,
            error: error.message ? `${error.message}` : "Something went wrong!",
          };
        });
      });
  }

  render() {
    const { resolved, loading, error, permissions } = this.state;
    const { classes } = this.props;
    if (!resolved) {
      let child: ReactNode = null;
      if (loading) {
        child = <LinearProgress className={classes.loading} />;
      } else if (!loading && error) {
        child = (
          <Paper elevation={3} className={classes.paperSection} component="div">
            <ErrorIcon color="error" />
            <Typography component="h5" variant="h5" style={{ color: "red" }}>
              {"Error"}
            </Typography>
            <Typography
              component="pre"
              variant="body2"
              style={{ overflowX: "auto", whiteSpace: "pre-wrap" }}
            >
              {`ErrorInfo : ${error}`}
            </Typography>
          </Paper>
        );
      } else if (
        !loading &&
        !error &&
        permissions.filter(
          (data: AppPermission) => data.required && !data.isAllowed
        ).length > 0
      ) {
        child = <p>Permission Required</p>;
      } else {
        child = <p>Contact here</p>;
      }
      return (
        <React.Fragment>
          <CssBaseline />
          <Container className={classes.container} component="section">
            {child}
          </Container>
        </React.Fragment>
      );
    }
    return (
      <Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default withStyles(styles)(PermissionProvider);

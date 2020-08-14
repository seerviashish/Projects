import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  CssBaseline,
  Container,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  LinearProgress,
} from "@material-ui/core";
import AppLogo from "src/components/AppLogo";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Trans } from "@lingui/react";
import { green, blue, red } from "@material-ui/core/colors";
import { SIGN_UP } from "src/constants/routes";
import {
  Consumer as SessionConsumer,
  SignInDetail,
} from "src/utils/session/SessionProvider";
import { Response, ResponseStatus } from "src/utils/TypeDefinition";

type Props = {
  signIn?: (signInDetail: SignInDetail) => Promise<Response>;
  updateUserState?: () => Promise<void>;
};

export type FormValue = {
  error: boolean;
  helperText: string;
  value: string;
};

export enum FormStateType {
  DEFAULT,
  LOADING,
  ERROR,
}

export type FormState = {
  type: FormStateType;
  info: string;
  passwordVisible: boolean;
};

type State = {
  formData: { [key: string]: FormValue };
  formState: FormState;
};

export type HelperTextMap = { [key: string]: { [id: string]: string } };

const helperTextMap: HelperTextMap = {
  email: {
    NotValid: "PleaseEnterValidEmailAddress",
    NotExist: "UserIsNotExistByThisEmailAddress",
  },
  password: {
    NotCorrect: "PleaseEnterCorrectPassword",
  },
  error: {
    signIn: "UserSignInFailed",
  },
};

const styles = (theme: Theme) =>
  createStyles({
    loading: {
      height: "0.5rem",
      width: "100%",
    },
    formSection: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(2),
        marginTop: "10vh",
        paddingBottom: "20px",
        [theme.breakpoints.down("sm")]: {
          marginTop: "4vh",
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
    signInForm: {
      display: "flex",
      flexFlow: "column",
      margin: "20px auto",
      "& > * ": {
        margin: "18px 0",
      },
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
    buttonAnimation: {
      width: "65px",
      borderRadius: "50%",
      margin: "18px auto",
      height: "65px",
      borderColor: `${green[400]} transparent transparent`,
      border: "5px solid",
      animation: `$rotatingStart 500ms ${theme.transitions.easing.easeOut},
       $rotating 1000ms ${theme.transitions.easing.easeOut} 500ms infinite`,
      "& > span": {
        opacity: 0,
        animation: `$fadeIn 300ms ${theme.transitions.easing.easeInOut}`,
      },
    },
    normalButton: {
      height: 65,
      textTransform: "none",
    },
    signUpLink: {
      fontWeight: 700,
      cursor: "pointer",
      marginLeft: "10px",
      textDecoration: "underline",
      "&:hover": {
        color: blue[700],
      },
    },
    "@keyframes fadeIn": {
      "0%": {
        opacity: 1,
      },
      "30%": {
        opacity: 0.2,
      },
      "100%": {
        opacity: 0,
      },
    },
    "@keyframes rotatingStart": {
      "0%": {
        width: "100%",
        borderRadius: 0,
        border: "none",
      },
      "50%": {
        borderRadius: "60px",
        border: "none",
      },
      "100%": {
        width: "65px",
        borderRadius: "50%",
        margin: "18px auto",
        borderColor: `${green[400]} transparent transparent`,
        border: "5px solid",
      },
    },
    "@keyframes rotating": {
      from: {
        transform: "rotate(0deg)",
      },
      to: {
        transform: "rotate(360deg)",
      },
    },
  });

class SignIn extends React.Component<
  Props & WithStyles<typeof styles> & RouteComponentProps,
  State
> {
  readonly state: State = {
    formData: {
      email: {
        error: false,
        helperText: "",
        value: "",
      },
      password: {
        error: false,
        helperText: "",
        value: "",
      },
    },
    formState: {
      type: FormStateType.DEFAULT,
      info: "",
      passwordVisible: false,
    },
  };

  componentDidMount() {}

  componentWillUnmount() {}

  handlePasswordVisibility = () => {
    this.setState((prevState: State) => {
      return {
        formState: {
          ...prevState.formState,
          passwordVisible: !prevState.formState.passwordVisible,
        },
      };
    });
  };

  handleOnMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  handleFormDataChange = (key: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [key]: {
          error: false,
          helperText: "",
          value: event.target.value,
        },
      },
      formState: {
        ...this.state.formState,
        type: FormStateType.DEFAULT,
        info: "",
      },
    });
  };

  private isFormValid = (): boolean => {
    const formData = { ...this.state.formData };
    let isValid = true;
    if (
      formData.email.value.trim().length === 0 ||
      (formData.email.value.trim().length > 0 &&
        !formData.email.value.match(
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/
        ))
    ) {
      isValid = false;
      formData.email.error = true;
      formData.email.helperText = helperTextMap.email.NotValid;
    }
    if (formData.password.value.trim().length === 0) {
      isValid = false;
      formData.password.error = true;
      formData.password.helperText = helperTextMap.password.NotCorrect;
    }
    this.setState({ formData });
    return isValid;
  };

  handleSignUpPageLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.props.history.replace(SIGN_UP);
  };

  handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (this.isFormValid()) {
        /* https://reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous
        Please read to use setState here.
      */
        this.setState((prevState: State) => {
          return {
            formState: {
              ...prevState.formState,
              type: FormStateType.LOADING,
              info: "",
            },
          };
        });
        const { signIn, updateUserState } = this.props;
        if (!signIn || !updateUserState) {
          throw new Error("Not found function for sign in");
        }
        const { email, password } = this.state.formData;
        const signInDetail: SignInDetail = {
          email: email.value,
          password: password.value,
        };
        const response: Response = await signIn(signInDetail);
        if (response.status === ResponseStatus.SUCCESS) {
          const formDefault = { value: "", error: false, helperText: "" };
          this.setState((prevState: State) => {
            return {
              ...prevState,
              formData: {
                email: {
                  ...formDefault,
                },
                password: {
                  ...formDefault,
                },
              },
              formState: {
                ...prevState.formState,
                type: FormStateType.DEFAULT,
                info: "",
              },
            };
          });
          await updateUserState();
        } else {
          throw new Error(response.error?.message);
        }
      }
    } catch (error) {
      this.setState((prevState: State) => {
        return {
          ...prevState,
          formState: {
            ...prevState.formState,
            type: FormStateType.ERROR,
            info: helperTextMap.error.signIn,
          },
        };
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { formData, formState } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container fixed className={classes.formSection} component="section">
          <Paper elevation={3} component="div">
            <AppLogo
              height="100px"
              width="100px"
              style={{ display: "block", margin: "20px auto 0px" }}
            />
            <Typography variant="h4" gutterBottom align="center">
              <Trans id="Message" />
            </Typography>
            <Typography variant="subtitle2" gutterBottom align="center">
              <Trans id="WelcomeToMessageApp" />
            </Typography>
            <form
              className={classes.signInForm}
              onSubmit={this.handleFormSubmit}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={formData.email.error}
                id="signin-email-form"
                type="email"
                label={<Trans id="EnterYourEmailAddress" />}
                value={formData.email.value}
                helperText={<Trans id={formData.email.helperText} />}
                onChange={this.handleFormDataChange("email")}
                variant="outlined"
              />
              <TextField
                error={formData.password.error}
                id="signin-password-form"
                type={formState.passwordVisible ? "text" : "password"}
                label={<Trans id="EnterYourPassword" />}
                onChange={this.handleFormDataChange("password")}
                value={formData.password.value}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handlePasswordVisibility}
                        onMouseDown={this.handleOnMouseDown}
                      >
                        {formState.passwordVisible ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                helperText={<Trans id={formData.password.helperText} />}
                variant="outlined"
              />
              <Button
                className={
                  formState.type === FormStateType.LOADING
                    ? classes.buttonAnimation
                    : classes.normalButton
                }
                variant="contained"
                color="primary"
                type="submit"
                disabled={formState.type === FormStateType.LOADING}
              >
                <Typography
                  variant="body1"
                  style={{ fontSize: "1.2rem", fontWeight: 700 }}
                  align="center"
                  component="span"
                >
                  <Trans id="SignIn" />
                </Typography>
              </Button>
              <Typography
                variant="subtitle2"
                style={{
                  fontSize: "1.0rem",
                  fontWeight: 400,
                  color: red[700],
                  display: "block",
                }}
                align="center"
                component="span"
              >
                {formState.type === FormStateType.ERROR && (
                  <Trans id={formState.info} />
                )}
              </Typography>
            </form>
            <Typography
              variant="subtitle1"
              align="center"
              style={{ margin: "0px 20px" }}
              component="p"
            >
              <Trans id="CreateAnAccountHere" />
              {"."}
              <Typography
                variant="subtitle1"
                className={classes.signUpLink}
                component="a"
                onClick={this.handleSignUpPageLink}
              >
                <Trans id="SignUp" />
              </Typography>
            </Typography>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

class SignInPageWrapper extends React.Component<
  WithStyles<typeof styles> & RouteComponentProps
> {
  render() {
    const { classes } = this.props;
    return (
      <SessionConsumer>
        {({ loading, signIn, updateUserState }) => {
          if (loading) {
            return <LinearProgress className={classes.loading} />;
          }
          return (
            <SignIn
              {...this.props}
              signIn={signIn}
              updateUserState={updateUserState}
            />
          );
        }}
      </SessionConsumer>
    );
  }
}

export default withRouter(withStyles(styles)(SignInPageWrapper));

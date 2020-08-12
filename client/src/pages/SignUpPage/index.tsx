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
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import AppLogo from "src/components/AppLogo";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Trans } from "@lingui/react";
import { green, blue, red } from "@material-ui/core/colors";
import { SIGN_IN } from "src/constants/routes";
import {
  FormValue,
  FormState,
  HelperTextMap,
  FormStateType,
} from "../SignInPage";
import appNetwork from "src/utils/network";
import apis from "src/constants/api";

type Props = {};
type State = {
  formData: { [key: string]: FormValue };
  formState: FormState;
};

const helperTextMap: HelperTextMap = {
  name: {
    notValid: "PleaseEnterValidName",
  },
  email: {
    NotValid: "PleaseEnterValidEmailAddress",
    IsExist: "UserIsExistByThisEmailAddress",
  },
  password: {
    NotCorrect: "PleaseEnterCorrectPassword",
  },
  error: {
    signUp: "UserSignUpFailed",
  },
};

const styles = (theme: Theme) =>
  createStyles({
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
    signUpForm: {
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
    signInLink: {
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

class SignUpPage extends React.Component<
  Props & WithStyles<typeof styles> & RouteComponentProps,
  State
> {
  readonly state: State = {
    formData: {
      name: {
        error: false,
        helperText: "",
        value: "",
      },
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
      type: FormStateType.SUCCESS,
      info: "",
      passwordVisible: false,
    },
  };

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
    if (formData.name.value.trim().length === 0) {
      isValid = false;
      formData.name.error = true;
      formData.name.helperText = helperTextMap.name.notValid;
    }
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

  handleSignInPageLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    this.props.history.replace(SIGN_IN);
  };

  handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (this.isFormValid()) {
        this.setState((prevState: State) => {
          return {
            formState: {
              ...prevState.formState,
              type: FormStateType.LOADING,
              info: "",
            },
          };
        });
        const { formData } = this.state;
        const data = {
          name: formData.name.value,
          email: formData.email.value,
          password: formData.password.value,
        };
        const signUpResponse = await appNetwork.post(apis.SIGN_UP, data);
        if (signUpResponse.data) {
          // await saveClientDB(new Client(USER_KEY, signUpResponse.data), cdb);
          this.setState((prevState: State) => {
            const formDataReset = { ...prevState.formData };
            formDataReset.name.value = "";
            formDataReset.email.value = "";
            formDataReset.password.value = "";
            return {
              ...prevState,
              formData: {
                ...formDataReset,
              },
              formState: {
                ...prevState.formState,
                type: FormStateType.SUCCESS,
                info: "",
              },
            };
          });
        } else {
          throw new Error("Sign up failed");
        }
      }
    } catch (error) {
      this.setState((prevState: State) => {
        return {
          ...prevState,
          formState: {
            ...prevState.formState,
            type: FormStateType.ERROR,
            info: helperTextMap.error.signUp,
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
              className={classes.signUpForm}
              onSubmit={this.handleFormSubmit}
              noValidate
              autoComplete="off"
            >
              <TextField
                error={formData.name.error}
                id="signup-name-form"
                type="text"
                label={<Trans id="EnterYourName" />}
                value={formData.name.value}
                helperText={<Trans id={formData.name.helperText} />}
                onChange={this.handleFormDataChange("name")}
                variant="outlined"
              />
              <TextField
                error={formData.email.error}
                id="signup-email-form"
                type="email"
                label={<Trans id="EnterYourEmailAddress" />}
                value={formData.email.value}
                helperText={<Trans id={formData.email.helperText} />}
                onChange={this.handleFormDataChange("email")}
                variant="outlined"
              />
              <TextField
                error={formData.password.error}
                id="signup-password-form"
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
                  <Trans id="SignUp" />
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
              <Trans id="IfYouAlreadyHaveAnAccount" />
              {"."}
              <Typography
                variant="subtitle1"
                className={classes.signInLink}
                component="a"
                onClick={this.handleSignInPageLink}
              >
                <Trans id="SignIn" />
              </Typography>
            </Typography>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(SignUpPage));

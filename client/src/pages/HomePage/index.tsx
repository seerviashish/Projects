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
import { Trans } from "@lingui/react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {
  Consumer as SessionConsumer,
  User,
} from "src/utils/session/SessionProvider";
import TabView from "src/components/TabView";
import ChatView from "src/components/ChatView";
import { ChatViewItemType, MessageType } from "src/utils/TypeDefinition";

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
  chatViewList: ChatViewItemType[];
};

const styles = (theme: Theme) =>
  createStyles({
    loading: {},
    container: {
      margin: 0,
      padding: 0,
      maxWidth: "100%",
    },
    tabContainer: {
      width: "100%",
      maxWidth: "100%",
      "& *": {
        textTransform: "none",
      },
    },
    main: {
      borderRadius: 0,
      position: "absolute",
      top: 100,
      bottom: 60,
      right: 0,
      left: 0,
      zIndex: -1,
      overflowY: "scroll",
      backgroundColor: "secondary",
    },
    title: {
      flexGrow: 1,
      margin: theme.spacing(2),
    },
    menuItem: {
      marginRight: theme.spacing(5),
    },
    footer: {
      position: "fixed",
      bottom: 0,
      height: 60,
      width: "100%",
    },
    tabView: {
      width: "100%",
    },
  });

class HomePage extends React.Component<
  Props & WithStyles<typeof styles>,
  State
> {
  readonly state: State = {
    tabIndex: 0,
    chatViewList: [
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "daddasdlhajsd ajsdadajda",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "1",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "17",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "16",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "15",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "14",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "13",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "12",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "11",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "10",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "9",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "8",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "7",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "6",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "5",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "4",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "3",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
      {
        lastMessage: {
          sender: {
            name: "Rohan Manga",
            email: "rohan@gmail.com",
          },
          recipient: {
            name: "Ashish Chaudhary",
            email: "ashish@gmail.com",
            isGroup: false,
            groupId: "",
          },
          messageContent: [
            {
              id: "1",
              message: [
                {
                  lineNum: 1,
                  content: "Hi Hello! Whats Ap!",
                  type: MessageType.TEXT,
                },
                {
                  lineNum: 2,
                  content: "dada",
                  type: MessageType.TEXT,
                },
              ],
            },
          ],
          sentTime: "",
          receivedTime: "",
          isRead: false,
          isReceived: false,
        },
        userName: "Ashish Chaudhary",
        userId: "2",
        profileUrl: "profile.jpeg",
        isRead: false,
      },
    ],
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
    const { anchorEl, tabIndex, chatViewList } = this.state;
    console.log("==>tabIndex ==> ", tabIndex);
    return (
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.container} component="div">
          <AppBar position="static">
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
          <Paper square className={classes.tabContainer} component="nav">
            <Tabs
              value={tabIndex}
              onChange={this.handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="tab buttons"
            >
              <Tab label="Chat" />
              <Tab label="Calls" />
            </Tabs>
          </Paper>
          <Paper
            className={classes.main}
            component="main"
            elevation={0}
            variant="outlined"
          >
            <TabView active={tabIndex === 0}>
              <ChatView chatViewList={chatViewList} />
            </TabView>
            <TabView active={tabIndex === 1}>
              <p>test 2</p>
            </TabView>
          </Paper>
          <Paper
            className={classes.footer}
            component="footer"
            elevation={3}
          ></Paper>
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

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
  UserInfo,
} from "src/utils/session/SessionProvider";
import TabView from "src/components/TabView";
import ChatView from "src/components/ChatView";
import { IMessageData } from "src/utils/TypeDefinition";

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
  chatViewList: IMessageData[];
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
      bottom: 0,
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
        updatedAt: "2020-08-18T13:54:53.451Z",
        name: "Emma Abby",
        profile: "/profiles/1.jpg",
        userId: "emma.abby@gmail.com",
        isGroup: false,
        about: "Hey! I am using message.",
        status: [
          {
            type: "IMAGE",
            url: "/assets/dress.jpg",
            id: "1e9966dd-ad72-4839-9a5b-7dd97d9b1181",
            createdAt: "2020-08-16T09:02:23.598Z",
          },
          {
            type: "VIDEO",
            url: "/assets/test.mp4",
            id: "e5e6343e-212b-45fa-96a5-a8e190803424",
            createdAt: "2020-08-16T09:02:23.598Z",
          },
          {
            type: "IMAGE",
            url: "/assets/dress.jpg",
            id: "dd4acc18-e3be-4ce6-9962-381c85efd4c0",
            createdAt: "2020-08-16T09:02:23.598Z",
          },
        ],
        messages: [
          {
            id: "1e9966dd",
            beforeId: "1pwe66dd",
            inReply: "",
            sender: {
              name: "Ashish",
              userId: "5f350b57dec76f5b846844d3",
            },
            recipient: {
              name: "Emma Abby",
              userId: "emma.abby@gmail.com",
            },
            sentTime: "2020-08-16T12:02:00.163Z",
            state: "READ",
            content: [
              {
                row: 1,
                type: "TEXT",
                data: "Good Morning",
              },
              {
                row: 2,
                type: "TEXT",
                data: "Hi! How are you?",
              },
            ],
          },
          {
            id: "dd4acc18",
            beforeId: "1e9966dd",
            inReply: "",
            sender: {
              name: "Emma Abby",
              userId: "emma.abby@gmail.com",
            },
            recipient: {
              name: "Ashish",
              userId: "5f350b57dec76f5b846844d3",
            },
            sentTime: "2020-08-16T12:04:00.163Z",
            state: "READ",
            content: [
              {
                row: 1,
                type: "TEXT",
                data: "Good Morning 🤩",
              },
              {
                row: 2,
                type: "TEXT",
                data: "I am fine. What's up?",
              },
            ],
          },
          {
            id: "dd4lcce8",
            beforeId: "dd4acc18",
            inReply: "",
            sender: {
              name: "Ashish",
              userId: "5f350b57dec76f5b846844d3",
            },
            recipient: {
              name: "Emma Abby",
              userId: "emma.abby@gmail.com",
            },
            sentTime: "2020-08-16T12:05:00.163Z",
            state: "RECEIVED",
            content: [
              {
                row: 1,
                type: "TEXT",
                data: "Let's Go for party....",
              },
            ],
          },
          {
            id: "ww4acc18",
            beforeId: "dd4lcce8",
            inReply: "",
            sender: {
              name: "Emma Abby",
              userId: "emma.abby@gmail.com",
            },
            recipient: {
              name: "Ashish",
              userId: "5f350b57dec76f5b846844d3",
            },
            sentTime: "2020-08-16T12:08:00.163Z",
            state: "RECEIVED",
            content: [
              {
                row: 1,
                type: "IMAGE",
                data: "/assets/dress.jpg",
              },
              {
                row: 2,
                type: "TEXT",
                data: "Be ready..",
              },
            ],
          },
        ],
      },
      {
        updatedAt: "2020-08-16T02:00:10.000Z",
        profile: "/profiles/2.jpg",
        userId: "lucy.smith@gmail.com",
        name: "Lucy Smith",
        isGroup: false,
        about: "Hey! I am using message.",
        status: [
          {
            type: "VIDEO",
            url: "/assets/test.mp4",
            id: "d77add7a-f892-4320-8439-592b6d7c5ea0",
            createdAt: "2020-08-16T09:01:23.598Z",
          },
        ],
        messages: [
          {
            id: "dwullae8",
            beforeId: "dwckcc18",
            inReply: "",
            sender: {
              name: "Ashish",
              userId: "5f350b57dec76f5b846844d3",
            },
            recipient: {
              name: "Lucy Smith",
              userId: "lucy.smith@gmail.com",
            },
            sentTime: "2020-08-16T12:10:00.163Z",
            state: "RECEIVED",
            content: [
              {
                row: 1,
                type: "TEXT",
                data: "Let's Go for party....",
              },
            ],
          },
          {
            id: "ew25er18",
            beforeId: "dwullae8",
            inReply: "",
            sender: {
              name: "Ashish",
              userId: "5f350b57dec76f5b846844d3",
            },
            recipient: {
              name: "Lucy Smith",
              userId: "lucy.smith@gmail.com",
            },
            sentTime: "2020-08-16T12:15:00.163Z",
            state: "RECEIVED",
            content: [
              {
                row: 1,
                type: "IMAGE",
                data: "/assets/dress.jpg",
              },
              {
                row: 2,
                type: "DOCUMENT",
                data: "/assets/doc123.pdf",
              },
              {
                row: 3,
                type: "TEXT",
                data: "Be ready..",
              },
              {
                row: 4,
                type: "VIDEO",
                data: "/assets/test.mp4",
              },
            ],
          },
        ],
      },
      {
        updatedAt: "2020-08-13T02:20:07.000Z",
        profile: "/profiles/3.jpg",
        name: "Ava Johnson",
        userId: "ava.johnson@gmail.com",
        about: "Hey! I am using message.",
        isGroup: false,
        messages: [
          {
            id: "dwull21e8",
            beforeId: "d51ckcc18",
            inReply: "",
            sender: {
              name: "Ashish",
              userId: "5f350b57dec76f5b846844d3",
            },
            recipient: {
              name: "Ava Johnson",
              userId: "ava.johnson@gmail.com",
            },
            sentTime: "2020-08-16T12:18:00.163Z",
            state: "SENT",
            content: [
              {
                row: 1,
                type: "TEXT",
                data: "Let's Go for party....",
              },
            ],
          },
        ],
        status: [],
      },
      {
        updatedAt: "2020-07-12T02:00:07.000Z",
        profile: "/profiles/4.jpg",
        name: "Amelia Williams",
        userId: "amelia.williams@gmail.com",
        about: "Hey! I am using message.",
        isGroup: false,
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-08-16T02:00:07.000Z",
        name: "Maya Brown",
        profile: "/profiles/5.jpg",
        userId: "maya.brown@gmail.com",
        about: "Busy",
        isGroup: false,
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-02-11T02:10:07.000Z",
        name: "Ruby Miller",
        profile: "/profiles/10.jpg",
        userId: "ruby.miller@gmail.com",
        about: "Sleeping",
        isGroup: false,
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-08-16T04:05:07.000Z",
        name: "Vivian Davis",
        profile: "/profiles/6.jpg",
        about: "Hey! I am using message.",
        userId: "vivian.davis@gmail.com",
        status: [],
        messages: [
          {
            id: "dwqop21e8",
            beforeId: "d51ckc18",
            inReply: "",
            sender: {
              name: "Ashish",
              userId: "5f350b57dec76f5b846844d3",
            },
            recipient: {
              name: "Vivian Davis",
              userId: "vivian.davis@gmail.com",
            },
            sentTime: "2020-08-16T12:25:00.163Z",
            state: "SENT",
            content: [
              {
                row: 1,
                type: "TEXT",
                data: "Let's Go for party....",
              },
            ],
          },
        ],
        isGroup: false,
      },
      {
        updatedAt: "2020-08-15T02:10:07.000Z",
        name: "Bella Garcia",
        profile: "/profiles/7.jpg",
        about: "Hey! I am using message.",
        userId: "bella.garcia@gmail.com",
        isGroup: false,
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-07-16T02:00:07.000Z",
        name: "Audey Rodriguez",
        profile: "/profiles/8.jpg",
        about: "Hey! I am using message.",
        userId: "audey.rodriguez@gmail.com",
        isGroup: false,
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-07-12T08:00:07.000Z",
        name: "Cayde Wilson",
        profile: "/profiles/9.jpg",
        userId: "cayde.wilson@gmail.com",
        about: "Focused",
        isGroup: false,
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-07-13T08:00:07.000Z",
        name: "Kace Martinez",
        profile: "/profiles/10.jpg",
        about: "Hey! I am using message.",
        isGroup: false,
        userId: "kace.martinez@gmail.com",
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-07-22T08:00:07.000Z",
        name: "Saeed Anderson",
        profile: "/profiles/3.jpg",
        about: "Hey! I am using message.",
        isGroup: false,
        userId: "saeed@gmail.com",
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-07-14T08:00:07.000Z",
        name: "Mdaf Taylor",
        profile: "/profiles/10.jpg",
        about: "Party Time!!",
        isGroup: false,
        userId: "mdaf@gmail.com",
        messages: [],
        status: [],
      },
      {
        updatedAt: "2020-07-12T08:00:07.000Z",
        name: "Sunday Tours",
        about: "Invite friends to join this group via link!!",
        isGroup: true,
        profile: "/profiles/10.jpg",
        groupId: "group1",
        messages: [],
        status: [],
        members: [
          {
            name: "Ashish",
            profile: "/profiles/3.jpg",
            role: "ADMIN",
            userId: "5f350b57dec76f5b846844d3",
          },
          {
            name: "Bella Garcia",
            profile: "/profiles/4.jpg",
            role: "USER",
            userId: "bella.garcia@gmail.com",
          },
        ],
      },
      {
        updatedAt: "2020-07-12T08:00:07.000Z",
        name: "Meeting Talk",
        about: "Meeting time tomorrow from 2:00pm to 3:00pm",
        isGroup: true,
        profile: "/profiles/2.jpg",
        groupId: "group2",
        messages: [],
        status: [],
        members: [
          {
            name: "Amelia Williams",
            role: "ADMIN",
            userId: "amelia.williams@gmail.com",
            profile: "/profiles/3.jpg",
          },
          {
            name: "Ashish",
            role: "ADMIN",
            profile: "/profiles/2.jpg",
            userId: "5f350b57dec76f5b846844d3",
          },
          {
            name: "Bella Garcia",
            role: "USER",
            profile: "/profiles/5.jpg",
            userId: "bella.garcia@gmail.com",
          },
          {
            name: "Emma Abby",
            role: "USER",
            profile: "/profiles/7.jpg",
            userId: "emma.abby@gmail.com",
          },
        ],
      },
    ],
  };

  componentDidMount() {}

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
    const userInfo: UserInfo | undefined = this.props.user?.user ?? undefined;
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
              <ChatView chatViewList={chatViewList} userId={userInfo?.id} />
            </TabView>
            <TabView active={tabIndex === 1}>
              <p>test 2</p>
            </TabView>
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

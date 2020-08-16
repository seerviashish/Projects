import React from "react";
import { withStyles, WithStyles } from "@material-ui/styles";
import {
  Theme,
  createStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import {
  IMessageData,
  IMessage,
  IMessageContentType,
  IMessageState,
  IMessageContent,
} from "src/utils/TypeDefinition";
import {
  getCalendarTimeFromTZ,
  getTimeStampFromTZ,
} from "src/utils/time-utils";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MESSAGES } from "src/constants/routes";

type ChatViewItemProps = {
  chatViewItem: IMessageData;
  key: number;
  userId?: string;
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: "5px 2px",
      width: "auto",
    },
    primaryText: {
      display: "block",
    },
    borderText: {
      border: "1px solid black",
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1),
    },
    receiveTime: {
      float: "right",
      fontSize: "small",
      color: "#2ECC71",
      fontWeight: "bold",
    },
    normalTime: {
      float: "right",
      fontSize: "small",
    },
  });

type LastMessage = {
  type: IMessageContentType;
  state: IMessageState;
  text: String;
  time: String;
  unreadCount: number;
};

const getLastMessage = (
  messagesData: IMessageData,
  userId: string | undefined
) => {
  const defaultTime = getCalendarTimeFromTZ(messagesData.updatedAt);
  let lastMessage: LastMessage = {
    type: IMessageContentType.TEXT,
    state: IMessageState.SENT,
    text: "",
    time: defaultTime,
    unreadCount: 0,
  };
  const length: number = messagesData.messages.length;
  if (length > 0) {
    let sortedMessages = messagesData.messages.sort(
      (msg1: IMessage, msg2: IMessage) => {
        return (
          getTimeStampFromTZ(msg1.sentTime) - getTimeStampFromTZ(msg2.sentTime)
        );
      }
    );
    sortedMessages.forEach((message: IMessage) => {
      if (
        userId &&
        message.recipient.userId === userId &&
        message.state === IMessageState.RECEIVED
      ) {
        lastMessage.unreadCount = lastMessage.unreadCount + 1;
      }
    });
    const lastMessageData: IMessage = sortedMessages[length - 1];
    if (lastMessage.unreadCount > 0) {
      lastMessage.state = IMessageState.RECEIVED;
    } else {
      switch (lastMessageData.state) {
        case IMessageState.ERROR:
          lastMessage.state = IMessageState.ERROR;
          break;
        case IMessageState.READ:
          lastMessage.state = IMessageState.READ;
          break;
        case IMessageState.RECEIVED:
          lastMessage.state =
            lastMessageData.recipient.userId === userId
              ? IMessageState.RECEIVED
              : IMessageState.SENT;
          break;
        case IMessageState.SENT:
          lastMessage.state = IMessageState.SENT;
          break;
        default:
          lastMessage.state = IMessageState.SENT;
          break;
      }
    }
    const lastContent: IMessageContent[] = sortedMessages[length - 1].content;
    const contentLength: number = lastContent.length;
    if (contentLength > 0) {
      const sortedLastContent = lastContent.sort(
        (content1: IMessageContent, content2: IMessageContent) =>
          content1.row - content2.row
      );
      const content: IMessageContent = sortedLastContent[contentLength - 1];
      switch (content.type) {
        case IMessageContentType.TEXT:
          lastMessage.type = IMessageContentType.TEXT;
          lastMessage.text = content.data;
          break;
        case IMessageContentType.VIDEO:
          lastMessage.type = IMessageContentType.VIDEO;
          lastMessage.text = "Video";
          break;
        case IMessageContentType.AUDIO:
          lastMessage.type = IMessageContentType.AUDIO;
          lastMessage.text = "Audio";
          break;
        case IMessageContentType.LINK:
          lastMessage.type = IMessageContentType.LINK;
          lastMessage.text = "Link";
          break;
        case IMessageContentType.DOCUMENT:
          lastMessage.type = IMessageContentType.DOCUMENT;
          lastMessage.text = "Document";
          break;
        case IMessageContentType.LOCATION:
          lastMessage.type = IMessageContentType.LOCATION;
          lastMessage.text = "Location";
          break;
        default:
          lastMessage.type = IMessageContentType.TEXT;
          lastMessage.text = "";
          break;
      }
    }
  }
  return lastMessage;
};

const ChatViewItem: React.FC<
  ChatViewItemProps & WithStyles<typeof styles> & RouteComponentProps
> = ({ chatViewItem, classes, key, userId, history }) => {
  const lastMessage = getLastMessage(chatViewItem, userId);
  return (
    <>
      <ListItem
        key={key}
        className={classes.root}
        onClick={(e) => {
          history.push(`/messages/${chatViewItem.userId}`);
        }}
      >
        <ListItemAvatar>
          <Avatar alt={chatViewItem.name} src={chatViewItem.profile} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component="span"
              variant="body1"
              color="textPrimary"
              className={classes.primaryText}
            >
              {chatViewItem.name}
              <Typography
                component="span"
                variant="body1"
                color="textPrimary"
                className={
                  lastMessage.state === IMessageState.RECEIVED
                    ? classes.receiveTime
                    : classes.normalTime
                }
              >
                {lastMessage.state === IMessageState.RECEIVED ? "• " : ""}
                {lastMessage.time}
              </Typography>
            </Typography>
          }
          secondary={
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              className={
                lastMessage.type === IMessageContentType.TEXT
                  ? ""
                  : classes.borderText
              }
            >
              {lastMessage.text}
              {lastMessage.state === IMessageState.RECEIVED && (
                <Typography
                  component="span"
                  variant="body1"
                  color="textPrimary"
                  className={
                    lastMessage.state === IMessageState.RECEIVED
                      ? classes.receiveTime
                      : classes.normalTime
                  }
                >
                  {lastMessage.unreadCount}
                </Typography>
              )}
            </Typography>
          }
        />
      </ListItem>
      {<Divider />}
    </>
  );
};

export default withRouter(withStyles(styles)(ChatViewItem));

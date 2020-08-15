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
  ChatViewItemType,
  MessageContent,
  MessageInfo,
  MessageType,
} from "src/utils/TypeDefinition";

type ChatViewItemProps = {
  chatViewItem: ChatViewItemType;
  key: number;
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: "5px 2px",
      width: "auto",
    },
    inline: {
      display: "inline",
    },
  });

const getLastMessage = (messageContent: MessageContent[]) => {
  if (messageContent.length > 0) {
    let lastMessage: MessageInfo = messageContent[0].message[0];
    messageContent[0].message.forEach((info: MessageInfo) => {
      if (lastMessage.lineNum < info.lineNum) {
        lastMessage = { ...info };
      }
    });
    return lastMessage;
  }
  return "";
};

const ChatViewItem: React.FC<ChatViewItemProps & WithStyles<typeof styles>> = ({
  chatViewItem,
  classes,
  key,
}) => {
  const lastMessage = getLastMessage(chatViewItem.lastMessage.messageContent);
  return (
    <>
      <ListItem key={key} className={classes.root}>
        <ListItemAvatar>
          <Avatar alt={chatViewItem.userName} src={chatViewItem.profileUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={chatViewItem.userName}
          secondary={
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {lastMessage && lastMessage.type === MessageType.DOCUMENT
                ? "Document"
                : ""}
              {lastMessage && lastMessage.type === MessageType.IMAGE
                ? "Image"
                : ""}
              {lastMessage && lastMessage.type === MessageType.VIDEO
                ? "Video"
                : ""}
              {lastMessage && lastMessage.type === MessageType.TEXT
                ? lastMessage.content
                : ""}
            </Typography>
          }
        />
      </ListItem>
      {<Divider />}
    </>
  );
};

export default withStyles(styles)(ChatViewItem);

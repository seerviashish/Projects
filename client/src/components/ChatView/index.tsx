import React from "react";
import { withStyles, WithStyles } from "@material-ui/styles";
import { Theme, createStyles, List } from "@material-ui/core";
import { IMessageData } from "src/utils/TypeDefinition";
import ChatViewItem from "../ChatViewItem";

type ChatViewProps = {
  chatViewList: IMessageData[];
  userId?: string;
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      width: "100%",
      "& :hover": {
        backgroundColor: "#B3B6B7",
        "& span": {
          color: "white",
          borderColor: "white",
        },
      },
    },
  });

const ChatView: React.FC<ChatViewProps & WithStyles<typeof styles>> = ({
  chatViewList,
  classes,
  userId,
}) => {
  return (
    <List className={classes.root}>
      {chatViewList.map((chatViewItem: IMessageData, index: number) => {
        return (
          <ChatViewItem
            chatViewItem={chatViewItem}
            key={index}
            userId={userId}
          />
        );
      })}
    </List>
  );
};

export default withStyles(styles)(ChatView);

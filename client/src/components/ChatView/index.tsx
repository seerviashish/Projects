import React from "react";
import { withStyles, WithStyles } from "@material-ui/styles";
import { Theme, createStyles, List } from "@material-ui/core";
import { ChatViewItemType } from "src/utils/TypeDefinition";
import ChatViewItem from "../ChatViewItem";

type ChatViewProps = {
  chatViewList: ChatViewItemType[];
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      width: "100%",
      "& :hover": {
        backgroundColor: "#B3B6B7",
        color: "white !important",
      },
    },
  });

const ChatView: React.FC<ChatViewProps & WithStyles<typeof styles>> = ({
  chatViewList,
  classes,
}) => {
  return (
    <List className={classes.root}>
      {chatViewList.map((chatViewItem: ChatViewItemType, index: number) => {
        // console.log("===> chatViewItem ==> ", chatViewItem);
        return <ChatViewItem chatViewItem={chatViewItem} key={index} />;
      })}
    </List>
  );
};

export default withStyles(styles)(ChatView);

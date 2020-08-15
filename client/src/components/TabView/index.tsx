import React, { ReactNode } from "react";
import { makeStyles } from "@material-ui/styles";

type TabViewProps = {
  children: ReactNode;
  active: boolean;
};
const useStyles = makeStyles({
  root: {
    maxWidth: "100%",
  },
});

const TabView: React.FC<TabViewProps> = ({ children, active }) => {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      style={{ display: `${active ? "block" : "none"}` }}
    >
      {children}
    </div>
  );
};

export default TabView;

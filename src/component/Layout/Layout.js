import React from "react";

import classes from "./styles/Layout.module.css";

const Layout = props => {
  return <div className={classes.Layout}>{props.children}</div>;
};

export default Layout;

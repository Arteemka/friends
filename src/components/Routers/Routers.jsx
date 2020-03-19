import React from "react";
import {Route} from "react-router";

import MainForm from "../MainForm/MainForm";
import User from "../User/User";

const Routers = () => (
  <>
    <Route exact path="/" component={MainForm} />
    <Route path="/:id" component={User} />
  </>
);

export default Routers;

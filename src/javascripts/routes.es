import React  from "react";
import Router from "react-router";

let {RouteHandler, Route, Redirect, NotFoundRoute} = Router;

import App from "./app.es";

import Robots  from "./views/robots.es";
import Robot   from "./views/robot.es";
import Device  from "./views/device.es";

import NotFound from "./views/not-found.es";

export default (
  <Route name="app" path="/" handler={App}>
    <Route name="robots" handler={Robots} />

    <Route name="robot" path="robots/:robot" handler={Robot}>
      <Route name="device" path="devices/:device" handler={Device}/>
    </Route>

    <Redirect from="/" to="robots"/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

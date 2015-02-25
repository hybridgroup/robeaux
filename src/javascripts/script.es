import React  from "react";
import Router from "react-router";

let {RouteHandler, Route, Redirect, NotFoundRoute} = Router;

import request from "superagent";

import Navigation from "./components/navigation.es";

import Robots  from "./views/robots.es";
import Robot   from "./views/robot.es";
import Device  from "./views/device.es";

import NotFound from "./views/not-found.es";

let App = React.createClass({
  getInitialState: function() {
    return { data: { robots: [] } };
  },

  componentDidMount: function() {
    request.get("/api", (res) => {
      let json = res.text,
          parsed = JSON.parse(json),
          MCP = parsed.MCP;

      this.setState({ data: MCP });
    });
  },

  render: function () {
    return (
      <div>
        <Navigation/>
        <RouteHandler data={this.state.data}/>
      </div>
    );
  }
});

let routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="robots" handler={Robots} />

    <Route name="robot" path="robots/:robot" handler={Robot}>
      <Route name="device" path="devices/:device" handler={Device}/>
    </Route>

    <Redirect from="/" to="robots"/>
    <NotFoundRoute handler={NotFound}/>
  </Route>
);

let container = document.querySelector("body > .container");

Router.run(routes, (Handler) => React.render(<Handler/>, container));

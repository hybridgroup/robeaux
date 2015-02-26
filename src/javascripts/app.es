import React from "react";
import {RouteHandler} from "react-router";

import {get} from "superagent";

import Navigation from "./components/navigation.es";

export default React.createClass({
  getInitialState: function() {
    return { data: { robots: [] } };
  },

  componentDidMount: function() {
    get("/api", (res) => {
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

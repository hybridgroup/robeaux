import React from "react";
import {RouteHandler} from "react-router";

import Navigation from "./components/navigation.es";

import fetch from "./fetch.es";

export default React.createClass({
  getInitialState() {
    return { loaded: false, data: {} };
  },

  componentDidMount() {
    fetch((err, json) => {
      if (err) {
        console.error("An error occured while fetching data:", err);
        return;
      }

      this.setState({ loaded: true, data: json.MCP });
    });
  },

  render() {
    let content = <h2> Loading, please wait </h2>;

    if (this.state.loaded) {
      content = <RouteHandler data={this.state.data} />;
    }

    return (
      <div>
        <Navigation/>
        {content}
      </div>
    );
  }
});

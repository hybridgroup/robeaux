import React from "react";
import {RouteHandler} from "react-router";

import {get} from "superagent";

import Navigation from './components/navigation.es';

export default React.createClass({
  getInitialState() {
    return { loaded: false, data: {} };
  },

  componentDidMount() {
    get("/api", (err, res) => {

      if (err) {
        console.error("An error occured while fetching data:", err)
        return;
      }
      let json = res.text,
          parsed = JSON.parse(json),
          MCP = parsed.MCP;

      this.setState({ loaded: true, data: MCP });
    });
  },

  render() {
    let content = <h2> Loading, please wait </h2>;

    if (this.state.loaded) {
      content = <RouteHandler data={this.state.data} />
    }

    return (
      <div>
        <Navigation/>
        {content}
      </div>
    );
  }
});

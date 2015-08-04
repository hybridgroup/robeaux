import React from "react";
import {Link} from "react-router";

import Details from "./details.es";

export default React.createClass({
  getInitialState() {
    return { details: false };
  },

  showDetails() {
    this.setState({ details: !this.state.details });
  },

  details() {
    if (!this.state.details) { return null; }

    let props = this.props.robot;

    let opts = {
      path: `robots/${encodeURIComponent(props.name)}`,
      json: props
    };

    return <Details {...opts} />;
  },

  render() {
    let {name, connections, devices} = this.props.robot;

    let link = `/robots/${encodeURIComponent(name)}`;

    return (
      <section className="row" key={name}>
        <div className="robot-info">
          <Link to={link} className="btn btn-robot btn-big"> robot </Link>

          <span className="name" onClick={this.showDetails}>{name}</span>

          <div className="details">
            <span className="bullet-connections">
              <strong>Connections</strong> {connections.length}
            </span>

            <span className="bullet-devices">
              <strong>Devices</strong> {devices.length}
            </span>
          </div>
        </div>

        { this.details() }
      </section>
    );
  }
});

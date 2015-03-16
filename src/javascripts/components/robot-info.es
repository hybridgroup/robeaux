import React from "react";
import {Link} from "react-router";

export default React.createClass({
  render: function() {
    let name = this.props.name,
        connections = this.props.connections,
        devices = this.props.devices;

    let link = `/robots/${encodeURIComponent(name)}`;

    return (
      <div className="robot-info" key={name}>
        <Link to={link} className="btn btn-robot btn-big"> robot </Link>

        <span className="name">{name}</span>

        <div className="details">
          <span className="bullet-connections">
            <strong>Connections</strong> {connections.length}
          </span>

          <span className="bullet-devices">
            <strong>Devices</strong> {devices.length}
          </span>
        </div>
      </div>
    );
  }
});

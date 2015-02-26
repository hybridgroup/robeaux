import React from "react";
import {Link} from "react-router";

export default React.createClass({
  render: function() {
    let bot = this.props.bot,
        link = `/robots/${encodeURIComponent(bot.name)}`;

    return (
      <div className="robot-info" key={bot.name}>
        <Link to={link} className="btn btn-robot btn-big"> robot </Link>

        <span className="name">{bot.name}</span>

        <div className="details">
          <span className="bullet-connections">
            <strong>Connections</strong> {bot.connections.length}
          </span>

          <span className="bullet-devices">
            <strong>Devices</strong> {bot.devices.length}
          </span>
        </div>
      </div>
    );
  }
});

import React from "react";
import {Link} from "react-router";

export default React.createClass({
  render: function() {
    let device = this.props.device,
        params = this.props.params;

    return (
      <div className="device">
        <Link className="btn btn-device" to="device" params={params}>
          device
        </Link>

        <span className="name">{device.name}</span>

        <div className="details">
          <span>{device.connection}</span>
        </div>
      </div>
    );
  }
});

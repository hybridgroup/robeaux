import React from "react";
import {Link} from "react-router";

export default React.createClass({
  render() {
    let params = this.props.params;

    let name = this.props.name,
        connection = this.props.connection;

    return (
      <div className="device">
        <Link className="btn btn-device" to="device" params={params}>
          device
        </Link>

        <span className="name">{name}</span>

        <div className="details">
          <span>{connection}</span>
        </div>
      </div>
    );
  }
});

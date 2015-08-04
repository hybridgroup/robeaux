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

    let bot = encodeURIComponent(this.props.params.robot),
        device = encodeURIComponent(this.props.params.device);

    let opts = {
      path: `robots/${bot}/devices/${device}`,
      json: this.props.device
    };

    return <Details {...opts}/>;
  },

  render() {
    let params = this.props.params;

    let {name, connection} = this.props.device;

    return (
      <div className="device">
        <Link className="btn btn-device" to="device" params={params}>
          device
        </Link>

        <span className="name" onClick={this.showDetails}>{name}</span>

        <div className="details">
          <span>{connection}</span>
        </div>

        { this.details() }
      </div>
    );
  }
});

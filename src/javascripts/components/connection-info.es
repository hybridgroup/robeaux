import React from "react";

export default React.createClass({
  render: function() {
    let name = this.props.name,
        port = this.props.port || "";

    return (
      <div className="connection">
        <button className="btn btn-device"> connection </button>

        <span className="name"> {name} </span>

        <div className="details">
          <span> {port} </span>
        </div>
      </div>
    );
  }
});

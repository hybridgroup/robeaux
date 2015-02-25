import React from "react";

export default React.createClass({
  render: function() {
    var conn = this.props.conn;

    return (
      <div className="connection">
        <button className="btn btn-device"> connection </button>

        <span className="name">{conn.name}</span>

        <div className="details">
          <span>
            {conn.port ? conn.port : ""}
          </span>
        </div>
      </div>
    );
  }
});

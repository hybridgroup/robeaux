import React from "react";

export default React.createClass({
  render() {
    let {name, port} = this.props.connection;

    port = port || "";

    return (
      <div className="connection">
        <button className="btn btn-connect"> connection </button>

        <span className="name"> {name} </span>

        <div className="details">
          <span> {port} </span>
        </div>
      </div>
    );
  }
});

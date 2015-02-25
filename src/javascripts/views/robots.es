import React from "react";

import RobotInfo from "../components/robot-info.es";

export default React.createClass({
  render: function() {
    let data = this.props.data;

    let robots = data.robots.map((bot) => {
      return <RobotInfo key={bot.name} bot={bot} />;
    });

    return (
      <div className="robots-listing">
        {robots}
      </div>
    );
  }
});

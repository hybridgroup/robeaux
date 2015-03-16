import React from "react";

import RobotInfo from "../components/robot-info.es";

export default React.createClass({
  robots: function() {
    let bots = (this.props.data && this.props.data.robots || []);
    return bots.map((bot) => <RobotInfo key={bot.name} {...bot} />);
  },

  render: function() {
    return (
      <div className="robots-listing">
        {this.robots()}
      </div>
    );
  }
});

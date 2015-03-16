import React from "react";
import {State, RouteHandler} from "react-router";

import NotFound from "./not-found.es";

import RobotInfo      from "../components/robot-info.es";
import DeviceInfo     from "../components/device-info.es";
import ConnectionInfo from "../components/connection-info.es";
import CommandTool    from "../components/command-tool.es";

export default React.createClass({
  mixins: [State],

  findRobot: function() {
    let name = this.getParams().robot,
        data = this.props.data;

    name = decodeURIComponent(name);

    return data.robots.filter((robot) => (robot.name === name))[0];
  },

  commandTool: function(bot) {
    let name = encodeURIComponent(bot.name),
        endpoint = "/api/robots/" + name;

    if (bot.commands.length) {
      return <CommandTool commands={bot.commands} endpoint={endpoint} />;
    }
  },

  devices: function(bot) {
    return bot.devices.map((device) => {
      let params = {
        robot: encodeURIComponent(bot.name),
        device: encodeURIComponent(device.name)
      };

      return <DeviceInfo key={device.name} {...device} params={params} />;
    });
  },

  connections: function(bot) {
    return bot.connections.map((conn) => {
      return <ConnectionInfo key={conn.name} {...conn} />;
    });
  },

  render: function() {
    let bot = this.findRobot();

    if (!bot) { return <NotFound />; }

    return (
      <div className="robot">
        <RobotInfo {...bot} />

        {this.commandTool(bot)}

        <RouteHandler bot={bot} />

        {this.devices(bot)}
        {this.connections(bot)}
      </div>
    );
  }
});

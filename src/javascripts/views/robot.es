import React from "react";
import {State, RouteHandler} from "react-router";

import NotFound from "./not-found.es";

import RobotInfo      from "../components/robot-info.es";
import DeviceInfo     from "../components/device-info.es";
import ConnectionInfo from "../components/connection-info.es";
import CommandTool    from "../components/command-tool.es";

export default React.createClass({
  mixins: [State],

  findRobot: function(name) {
    var data = this.props.data;

    return data.robots.filter(function(robot) {
      return (robot.name === name);
    })[0];
  },

  render: function() {
    let name = this.getParams().robot,
        bot = this.findRobot(name),
        commandTool;

    if (!bot) { return <NotFound />; }

    var params = { robot: encodeURIComponent(bot.name) };

    if (bot.commands.length) {
      commandTool = (
        <CommandTool commands={bot.commands} endpoint={`/api/robots/${name}`} />
      );
    } else {
      commandTool = "";
    }

    return (
      <div className="robot">
        <RobotInfo bot={bot} />

        {commandTool}

        <RouteHandler bot={bot} />

        {bot.devices.map(function(device) {
          params.device = encodeURIComponent(device.name);
          return <DeviceInfo key={device.name} device={device} params={params} />;
        })}

        {bot.connections.map(function(conn) {
          return <ConnectionInfo key={conn.name} conn={conn}/>;
        })}
      </div>
    );
  }
});

import React from "react";
import {State, RouteHandler} from "react-router";

import NotFound from "./not-found.es";

import RobotInfo from "../components/robot-info.es";
import DeviceInfo from "../components/device-info.es";
import ConnectionInfo from "../components/connection-info.es";
import CommandTool from "../components/command-tool.es";

export default React.createClass({
  mixins: [State],

  findRobot() {
    let name = this.getParams().robot,
        data = this.props.data;

    name = decodeURIComponent(name);

    return data.robots.filter((robot) => (robot.name === name))[0];
  },

  commandTool(bot) {
    let name = encodeURIComponent(bot.name),
        endpoint = "/api/robots/" + name;

    if (bot.commands.length) {
      return <CommandTool commands={bot.commands} endpoint={endpoint} />;
    }
  },

  devices(bot) {
    return bot.devices.map((device) => {
      let params = {
        robot: encodeURIComponent(bot.name),
        device: encodeURIComponent(device.name)
      };

      return <DeviceInfo key={device.name} {...device} params={params} />;
    });
  },

  connections(bot) {
    return bot.connections.map((conn) => {
      return <ConnectionInfo key={conn.name} {...conn} />;
    });
  },

  render() {
    let bot = this.findRobot();

    if (!bot) { return <NotFound />; }

    return (
      <div className="robot">
        <RobotInfo {...bot} />

        <div className="container">
          {this.commandTool(bot)}
        </div>

        <RouteHandler bot={bot} />

        <section className="row">
          <div className="connections">
            {this.devices(bot)}
            {this.connections(bot)}
          </div>
        </section>
      </div>
    );
  }
});

import React from "react";
import {State} from "react-router";

import NotFound from "./not-found.es";

import CommandTool from "../components/command-tool.es";
import EventTool from "../components/event-tool.es";

export default React.createClass({
  mixins: [State],

  findDevice(name) {
    let robot = this.props.bot,
        endpoint;

    let device = robot.devices.filter(function(device) {
      return (device.name === name);
    })[0];

    if (device) {
      let r = encodeURIComponent(robot.name),
          d = encodeURIComponent(device.name);

      endpoint = `/api/robots/${r}/devices/${d}`;
    }

    return [device, endpoint];
  },

  render: function() {
    let name = this.getParams().device,
        [device, endpoint] = this.findDevice(name),
        commandTool;

    if (!device) { return <NotFound />; }

    if (device.commands.length) {
      commandTool = (
        <CommandTool commands={device.commands} endpoint={endpoint} />
      );
    } else {
      commandTool = "";
    }

    return (
      <div>
        {commandTool}
        <EventTool endpoint={endpoint} />
      </div>
    );
  }
});

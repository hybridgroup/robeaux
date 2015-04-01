var express = require('express');
var app = express();

app.use(express["static"](require("path").resolve(__dirname + "/../")));

app.use(function(req, res, next) {
  res.set("Access-Control-Allow-Origin", this.CORS || "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  return next();
});

app.get('/api', function (req, res) {
  res.send({ MCP: MCP });
});

app.listen(3000)

// dummy data to send to the client
var MCP = {
  commands: [ "echo" ],
  events: [ "robot_added", "robot_removed" ],

  robots: [
    {
      commands: [ "hello" ],
      connections: [
        {
          adaptor: "Loopback",
          details: {
            port: "/dev/null",
            test: "abc"
          },
          name: "loopback"
        }
      ],
      devices: [
        {
          commands: [ "ping", "otherPing", "aThirdThing" ],
          connection: "loopback",
          details: {
            pin: "13",
            test: "abc"
          },
          driver: "Ping",
          events: [ "ping" ],
          name: "ping"
        },
        {
          commands: ["cmd1", "cmd2", "cmd3"],
          connection: "loopback",
          details: {
            pin: "13",
            test: "abc"
          },
          driver: "Ping",
          events: [ "ping" ],
          name: "ping-2"
        }
      ],
      events: [ "hello" ],
      name: "TestBot"
    },
    {
      commands: [ "hello" ],
      connections: [
        {
          adaptor: "Loopback",
          details: {
            port: "/dev/null",
            test: "abc"
          },
          name: "loopback"
        }
      ],
      devices: [
        {
          commands: [ "ping" ],
          connection: "loopback",
          details: {
            pin: "13",
            test: "abc"
          },
          driver: "Ping",
          events: [ "ping" ],
          name: "ping"
        }
      ],
      events: [ "hello" ],
      name: "TestBot-1"
    }
  ]
};

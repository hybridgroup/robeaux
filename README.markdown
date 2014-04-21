# Robeaux

Robeaux (/rō-bō/) is a universal dashboard to your robotic devices. Like a router admin
page, but for robots.

Robeaux is powered by [AngularJS](http://angularjs.org/), and provides
a front-end to the API interface offered by [Artoo](http://artoo.io),
[Cylon.js](http://cylonjs.com) and [Gobot](http://gobot.io). It looks like this:

![Robeaux Interface](http://i.imgur.com/T50PhUe.png)

## How It Works

Thanks to using a structured interface based on the RESTful APIs of Artoo,
Cylon.js and Gobot, Robeaux can query or set values on one or more robots, and
all of the devices connected to each robot. As long as they are connected to
a compatible API server.

### Robots

You can see each robot that your are connected to, and then drill in to view or
edit it.

![Robots View](http://i.imgur.com/T50PhUe.png)

### Connections

How are you connected? Serial port? WiFi? View the details for each of your
robots.

![Connections View](http://i.imgur.com/OKwG3P7.png)

### Devices

Each robot has one or more devices connected. You can view the device status and
send commands all via the web interface. You can even stream the real-time
event data for your buttons, switches, LEDs, sensors, and more.

![Devices View](http://i.imgur.com/tTkyx3q.png)

## Themes

You can change the theme! Pick from one of the presets, or write your own. It'll
be persisted in `localStorage` and ready to go for the next time you want to use
Robeaux.

![Custom Theme Editor](http://i.imgur.com/5yefYn9.png)

## Pushing new versions

Before you push a new release, make sure you've bumped the version in
`package.json` and `robeaux.gemspec`, and commited + pushed those changes.

Then, just run `make release`. It'll take care of:

- cutting a git tag
- pushing tags to GitHub
- building/pushing a new RubyGem
- publishing a new NPM release

## Releases

- 0.1.0 - Full rewrite. Supports Server-Sent-Events.

- 0.0.4 - Feature improvements

- 0.0.3 - Feature improvements

- 0.0.2 - Initial release.

## LICENSE

Copyright (c) 2014 The Hybrid Group

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

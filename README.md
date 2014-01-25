# Robeaux

Robeaux is the [AngularJS](http://angularjs.org/) front-end to the API interface offered by [Cylon.js](http://cylonjs.com) and [Artoo](http://artoo.io). It looks like this:

![Robeaux Interface](http://i.imgur.com/VXZW2F0.png)

You can consider Robeaux to be a universal dashboard to your robotic devices. Like the admin pages for a router, but for robots.

## How It Works

Thanks to using a standardized API based on the APIs of Artoo and Cylon.js, Robeaux can query or set values on with all the robots, and all of the devices connected to each robot, that are corrected to a compatible API server.

### Robots


### Connections


### Devices


## Prenunciation

Robeaux should be said aloud like "robo". We want to be the handsome user interface for all your robotic devices.

## Pushing new versions

Before you push a new release, make sure to create a tag:

    git tag -m "[VERSION]" [VERSION]

And push it to GitHub

    git push --tags

### RubyGems:

    gem build robeaux.gemspec
    gem push robeaux-[VERSION].gem

### NPM

    npm publish ./

## LICENSE

Copyright (c) 2014 The Hybrid Group

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

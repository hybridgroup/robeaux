# Robeaux

Robeaux (/rō-bō/) is a universal dashboard to your robotic devices.
Like a router admin page, but for robots.

Robeaux is powered by [React](http://reactjs.com/).
It provides a front-end to the [CPPP-IO][] API interface offered by [Artoo][], [Cylon.js][] and [Gobot][].

[CPPP-IO]: https://github.com/hybridgroup/cppp-io
[Artoo]: http://artoo.io
[Cylon.js]: http://cylonjs.com
[Gobot]: http://gobot.io

## Dependencies

    $ npm install
    $ gem install sass

For faster CSS compilation, you can also install `sassc`.

OS X instructions:

    $ brew install sassc

## Building

Included make tasks:

Command          | Result
---------------- | --------------------
`make lint`      | lints src/javascripts with JSXHint
`make js`        | builds JS
`make css`       | builds CSS
`make all`       | builds both
`make clean`     | cleans build targets
`make minify`    | builds minified CSS / JS
`make watch-js`  | watches + builds JS
`make watch-css` | watches + builds CSS*

*: depends on having [peat](https://github.com/sjl/peat) installed if you use `sassc`.

## Releases

Version | Description
------- | -----------
0.5.1   | Correct params sent
0.5.0   | Add CPPP-IO details dropdown (click on robot/device names)
0.4.1   | Remove an errant semi-colon in a template
0.4.0   | Re-implementation with React
0.3.0   | New style updates
0.2.0   | Update for CPP-IO API spec
0.1.1   | Remove dependency on Google WebFonts
0.1.0   | Full rewrite. Supports Server-Sent-Events.
0.0.4   | Feature improvements
0.0.3   | Feature improvements
0.0.2   | Initial release.

## License

Copyright (c) 2014-2017 The Hybrid Group

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

[sassc]: https://github.com/sass/sassc

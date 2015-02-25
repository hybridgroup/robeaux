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

Robeaux's build chain requires the following tools:

#### Browserify

Used to concatenate source JavaScript down to a single `script.js` file.

Install through NPM:

    $ npm install -g browserify

#### UglifyJS

Used to minify generated JavaScript.

Install through NPM:

    $ npm install -g uglify-js

#### JSXHint

A modified version of JSHint, used to lint source ES6.

Install through NPM:

    $ npm install -g jsxhint

#### Babelify

A Browserify plug-in for [babel][], a ES6 -> ES5 transpiler with support for React's JSX.

Install it with NPM:

    # through package developer dependencies
    $ npm install

    # or manually
    $ npm install babelify

[Babel]: https://babeljs.io

#### Envify

A Browserify plug-in to make Uglify's dead-code removal work better, by hard-coding `process.env.NODE_ENV` calls.

Install it with NPM:

    # through package developer dependencies
    $ npm install

    # or manually
    $ npm install envify

#### Sass

Used to compile / concatenate / compress CSS.

Install via RubyGems:

    $ gem install sass

Alternatively, for faster builds, you can install the C-based [sassc][] tool.

For Mac users, `sassc` is available via Homebrew:

    $ brew install sassc

If installed, `sassc` will be used by the build process over the RubyGem.

## Building

With all the pieces in place, you can now build Robeaux.

Our build tool of choice is `make`.

For available, commands, just run `make`:

      $ make
      make [task]

        make clean    - removes built files
        make lint     - runs JSXHint against src/javascripts
        make js       - builds JavaScript with Browserify
        make css      - builds CSS with Sass
        make all      - cleans targets, then builds css + js
        make minified - cleans targets, then builds minified versions of css + js

## License

Copyright (c) 2014-2015 The Hybrid Group

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.

[sassc]: https://github.com/sass/sassc

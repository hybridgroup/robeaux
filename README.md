# Roboux

Roboux is the Angular front-end to the API interface offered by
[Cylon.js](http://cylonjs.com) and [Artoo](http://artoo.io). It looks like this:

![Roboux Interface](http://i.imgur.com/VXZW2F0.png)

## Pushing new versions

Before you push a new release, make sure to create a tag:

    git tag -m "[VERSION]" [VERSION]

And push it to GitHub

    git push --tags

### RubyGems:

    gem build roboux.gemspec
    gem push roboux-[VERSION].gem

### NPM

    npm publish ./

## LICENSE

Copyright (c) 2014 The Hybrid Group

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

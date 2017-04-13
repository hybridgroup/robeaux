# -*- encoding: utf-8 -*-

require "rake"

Gem::Specification.new do |s|
  s.name        = "robeaux"
  s.version     = "0.5.1"
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["The Hybrid Group"]
  s.email       = ["cylonjs@hybridgroup.com"]
  s.homepage    = "https://github.com/hybridgroup/robeaux"
  s.summary     = %q{A React-based front-end for CPPP-IO APIs}
  s.description = s.summary
  s.license     = 'Apache 2.0'

  s.files       = FileList[
    "index.html",
    "README.markdown",
    "robeaux.gemspec",
    "css/**/*",
    "js/**/*",
    "fonts/**/*",
    "images/**/*"
  ].to_a
end

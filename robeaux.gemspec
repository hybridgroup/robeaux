# -*- encoding: utf-8 -*-

def files
  included = []

  included << "index.html"
  included << "README.markdown"
  included << "Makefile"
  included << "robeaux.gemspec"

  included << Dir[File.join("css", "**", "*")]
  included << Dir[File.join("js", "**", "*")]
  included << Dir[File.join("fonts", "**", "*")]
  included << Dir[File.join("images", "**", "*")]

  included.flatten
end

Gem::Specification.new do |s|
  s.name        = "robeaux"
  s.version     = "0.3.0"
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["The Hybrid Group"]
  s.email       = ["cylonjs@hybridgroup.com"]
  s.homepage    = "https://github.com/hybridgroup/robeaux"
  s.summary     = %q{A React-based front-end for CPPP-IO APIs}
  s.description = s.summary
  s.license     = 'Apache 2.0'

  s.files         = files
end

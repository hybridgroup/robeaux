# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name        = "artoo"
  s.version     = Artoo::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Ron Evans", "Adrian Zankich", "Ari Lerner", "Mario Ricalde",
                   "Daniel Fischer", "Andrew Stewart"]
  s.email       = ["artoo@hybridgroup.com"]
  s.homepage    = "https://github.com/hybridgroup/robot-ng"
  s.summary     = %q{Angular-based front end for Artoo API}
  s.description = %q{Angular-based front end for Artoo API}
  s.license     = 'Apache 2.0'

  s.rubyforge_project = "artoo-api-ng"

  s.files         = `git ls-files`.split("\n")
end

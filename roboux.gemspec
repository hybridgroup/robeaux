# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name        = "roboux"
  s.version     = "0.0.1"
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Ron Evans", "Adrian Zankich", "Ari Lerner", "Mario Ricalde",
                   "Daniel Fischer", "Andrew Stewart"]
  s.email       = ["artoo@hybridgroup.com"]
  s.homepage    = "https://github.com/hybridgroup/roboux"
  s.summary     = %q{Angular-based front end for Artoo API}
  s.description = %q{Angular-based front end for Artoo API}
  s.license     = 'Apache 2.0'

  s.rubyforge_project = "roboux"

  s.files         = `git ls-files`.split("\n")
end

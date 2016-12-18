require 'capybara/rspec'
require 'capybara/poltergeist'

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(
    app,
    window_size: [1280, 1024],
    # debug:       true,
    js_errors:   true,
    inspector:   true
  )
end
Capybara.default_driver    = :poltergeist
Capybara.javascript_driver = :poltergeist

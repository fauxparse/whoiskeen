require 'rails_helper'
require 'support/features/clearance_helpers'

RSpec.feature 'User creates team' do
  scenario 'with valid parameters' do
    sign_in
    visit teams_path
    add_team 'Sulaco'
    expect_to_be_on_team_page('Sulaco')
  end
end

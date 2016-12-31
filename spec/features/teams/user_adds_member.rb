require 'rails_helper'

RSpec.feature 'User adds member' do
  scenario 'with valid parameters' do
    sign_in
    visit teams_path
    add_team 'Sulaco', 'Ripley'
    expect_to_be_on_team_page('Sulaco')
    team = Team.last
    add_member(team, 'Dallas')
    expect(team.members.where(name: 'Dallas')).to exist
  end
end

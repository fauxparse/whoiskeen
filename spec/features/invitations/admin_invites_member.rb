require 'rails_helper'

RSpec.feature 'Admin invites member' do
  scenario 'who is an existing user' do
    admin = create(:member, :admin)
    member = create(:member, team: admin.team)
    user = create(:user)
    sign_in_as admin.user
    visit team_people_path(admin.team)
    expect(page).to have_content(member.name)
    within(:css, "[data-member-id=\"#{member.id}\"]") do
      find(:css, '[rel="toggle"]').click
      fill_in(:email, with: user.email)
      find(:css, '[type="submit"]').click
      expect(page).not_to have_selector('.invitation-form.open')
    end
    expect(member.invitations).to exist
    sign_out

    sign_in_as user
    visit invitation_path(Invitation.last)
    click_button t('invitations.show.accept')

    expect(page).to have_content(t('teams.people.title'))
    find(:css, '[data-tab="people"]').click
    expect(page).to have_content(member.team.name)
    expect(page).to have_content(member.name)
    expect(page).to have_content(admin.name)
  end
end

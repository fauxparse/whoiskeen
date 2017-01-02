# rubocop:disable Metrics/AbcSize
module Features
  module TeamHelpers
    def add_team(name, display_name)
      expect(page).to have_selector('[rel="add"]')
      find(:css, '[rel="add"]').click
      within(:css, '.new-team') do
        expect(page).to have_content t('activerecord.attributes.team.name')
        fill_in t('activerecord.attributes.team.name'), with: name
        fill_in t('activerecord.attributes.team.display_name'),
          with: display_name
        first(:css, '[type="submit"]').trigger('click')
      end
    end

    def add_member(team, name)
      visit team_path(team)
      find(:css, '[data-tab="people"]').click
      expect(page).to have_selector('.members')
      find(:css, '[rel="add"]').click
      expect(page).to have_selector('.new-member')
      within(:css, '.new-member') do
        fill_in t('activerecord.attributes.member.name'), with: name
        first(:css, '[type="submit"]').trigger('click')
      end
      expect(page).not_to have_selector('.new-member')
    end

    def expect_to_be_on_team_page(name)
      expect(page).not_to have_selector('.new-team')
      within(:css, '.section-header') do
        expect(page).to have_content(name)
      end
      expect(page.current_path).to eq inbox_team_path(name.to_url)
    end
  end
end

RSpec.configure do |config|
  config.include Features::TeamHelpers, type: :feature
end

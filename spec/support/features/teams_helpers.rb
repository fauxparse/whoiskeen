module Features
  module TeamHelpers
    def add_team(name)
      expect(page).to have_selector('[rel="add"]')
      find(:css, '[rel="add"]').click
      within(:css, '.new-team') do
        expect(page).to have_content t('activerecord.attributes.team.name')
        fill_in t('activerecord.attributes.team.name'), with: name
        first(:css, '[type="submit"]').trigger('click')
      end
    end

    def expect_to_be_on_team_page(name)
      expect(page).not_to have_selector('.new-team')
      within(:css, '.section-header') do
        expect(page).to have_content(name)
      end
      expect(page.current_path).to eq team_path(name.to_url)
    end
  end
end

RSpec.configure do |config|
  config.include Features::TeamHelpers, type: :feature
end

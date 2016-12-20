module Features
  module ClearanceHelpers
    def reset_password_for(email)
      visit root_path
      find(:css, '[rel="password"]').click
      fill_in 'email', with: email
      click_button I18n.t('helpers.submit.password.submit')
    end

    def sign_in
      password = 'password'
      user = FactoryGirl.create(:user, password: password)
      sign_in_with user.email, password
    end

    def sign_in_with(email, password)
      visit root_path
      find(:css, '[rel="login"]').click
      fill_in 'email', with: email
      fill_in 'password', with: password
      click_button 'Log in'
    end

    def sign_out
      find(:css, '[rel="menu"]').click
      click_button I18n.t('layouts.application.sign_out')
    end

    def sign_up_with(email, password)
      visit root_path
      find(:css, '[rel="signup"]').click
      fill_in 'email', with: email
      fill_in 'password', with: password
      click_button I18n.t('helpers.submit.user.create')
    end

    def expect_user_to_be_signed_in
      expect(page).to have_content I18n.t('layouts.application.sign_out')
    end

    def expect_user_to_be_signed_out
      expect(page).to have_content I18n.t('layouts.application.sign_in')
    end

    def user_with_reset_password
      user = FactoryGirl.create(:user)
      reset_password_for user.email
      user.reload
    end
  end
end

RSpec.configure do |config|
  config.include Features::ClearanceHelpers, type: :feature
end

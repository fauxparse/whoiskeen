# frozen_string_literal: true
require 'rails_helper'

RSpec.feature 'User signs in' do
  scenario 'with valid username and password' do
    User.create!(email: 'user@example.com', password: 'password')
    visit root_path
    expect(page).to have_selector('.login-form')
    fill_in 'email', with: 'user@example.com'
    fill_in 'password', with: 'password'
    click_button 'Log in'
    expect(page).to have_content('Log out')
  end
end

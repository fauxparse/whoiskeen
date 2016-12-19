FactoryGirl.define do
  factory :team do
    name "Sulaco"
  end

  sequence :email do |n|
    "user#{n}@sula.co"
  end

  factory :user do
    email
    password 'password'
  end
end

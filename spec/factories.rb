FactoryGirl.define do
  sequence :name do |n|
    "User #{n}"
  end

  sequence :email do |n|
    "user#{n}@sula.co"
  end

  factory :member do
    team
    name

    trait :real do
      user
    end

    trait :admin do
      admin true
    end
  end

  factory :team do
    name 'Sulaco'
  end

  factory :user do
    email
    password 'password'
  end
end

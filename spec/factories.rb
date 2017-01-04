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
      real
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

  factory :invitation do
    transient do
      team { create(:team) }
    end

    email
    sender { create(:member, :admin, team: team) }
    member { create(:member, team: team) }
  end
end

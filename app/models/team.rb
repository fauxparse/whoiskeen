class Team < ApplicationRecord
  include Sluggable

  has_many :members, -> { includes :user }, autosave: true
end

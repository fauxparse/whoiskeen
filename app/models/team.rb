class Team < ApplicationRecord
  include Sluggable

  has_many :members, -> { includes :user }, autosave: true
  has_many :invitations, through: :members
end

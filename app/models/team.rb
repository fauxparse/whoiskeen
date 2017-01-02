class Team < ApplicationRecord
  include Sluggable

  has_many :members, autosave: true
end

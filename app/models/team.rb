class Team < ApplicationRecord
  include Sluggable

  has_many :members
end

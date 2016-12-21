class TeamSerializer < ApplicationSerializer
  attributes :id, :name, :slug
  has_many :members
end

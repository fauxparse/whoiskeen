class UserSerializer < ApplicationSerializer
  attributes :id, :email
  has_many :memberships
end

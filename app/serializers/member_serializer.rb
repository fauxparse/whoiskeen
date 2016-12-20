class MemberSerializer < ApplicationSerializer
  attributes :id, :name
  belongs_to :team
end

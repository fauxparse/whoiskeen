class MemberSerializer < ApplicationSerializer
  attributes :id, :name, :slug, :user_id
  belongs_to :team
end

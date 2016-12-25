class MemberSerializer < ApplicationSerializer
  attributes :id, :name, :slug, :user_id, :updated_at
  belongs_to :team
end

class Member < ApplicationRecord
  belongs_to :team
  belongs_to :user, optional: true, inverse_of: :memberships

  acts_as_url :name, url_attribute: :slug, limit: 128, scope: :team_id

  validates :team_id, presence: true
  validates :name, presence: true, length: { maximum: 128 }
  validates :user_id, uniqueness: { scope: :team_id, allow_blank: true }

  alias to_param slug
end

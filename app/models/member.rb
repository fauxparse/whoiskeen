class Member < ApplicationRecord
  belongs_to :team
  belongs_to :user, optional: true, inverse_of: :memberships

  acts_as_url :name, url_attribute: :slug, limit: 128, scope: :team_id

  validates :name, presence: true, length: { maximum: 128 }
  validates :user_id, uniqueness: { scope: :team_id, allow_blank: true }
  validates :admin, absence: true, unless: :user?

  alias to_param slug

  def user?
    user_id? || user.present?
  end
end

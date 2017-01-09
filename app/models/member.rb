class Member < ApplicationRecord
  belongs_to :team
  belongs_to :user, optional: true, inverse_of: :memberships
  has_many :invitations, -> { pending }

  acts_as_url :name, url_attribute: :slug, limit: 128, scope: :team_id

  validates :name, presence: true, length: { maximum: 128 }
  validates :user_id, uniqueness: { scope: :team_id, allow_blank: true }
  validates :admin, absence: true, unless: :user?

  scope :admin, -> { where(admin: true) }

  alias to_param slug

  def user?
    user_id? || user.present?
  end
end

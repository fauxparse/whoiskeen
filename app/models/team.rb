class Team < ApplicationRecord
  acts_as_url :name,
    url_attribute: :slug,
    limit: 128

  validates :name,
    presence: true,
    length: { in: 4..128 }

  alias_method :to_param, :slug
end

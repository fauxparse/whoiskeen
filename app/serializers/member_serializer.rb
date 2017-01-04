require 'digest/md5'

class MemberSerializer < ApplicationSerializer
  attributes :id, :name, :slug, :email, :updated_at, :avatar, :admin
  belongs_to :team

  def email
    object.user.try(:email)
  end

  def avatar
    gravatar if email.present?
  end

  private

  def gravatar
    hash = Digest::MD5.hexdigest(email.strip.downcase)
    "https://www.gravatar.com/avatar/#{hash}?d=retro"
  end
end

class Invitation < ApplicationRecord
  CODE_LENGTH = 32

  belongs_to :sender, class_name: 'Member'
  belongs_to :member
  has_one :team, through: :member

  enum status: {
    pending: 'pending',
    accepted: 'accepted',
    declined: 'declined',
    cancelled: 'cancelled'
  }

  before_validation :generate_unique_code, unless: :code?

  validates :sender, :member, presence: true
  validates :email,
    presence: true,
    email: { strict_mode: true }
  validates :code,
    presence: true,
    format: { with: /\A[0-9a-f]+\z/ },
    length: { is: CODE_LENGTH }

  validate :sender_is_admin
  validate :same_team
  validate :not_already_registered, if: :member_id?
  validate :unique_email, if: [:member_id?, :email?]

  def to_param
    code
  end

  delegate :team_id, to: :member

  private

  def generate_unique_code
    loop do
      self.code = SecureRandom.hex(CODE_LENGTH / 2)
      break unless Invitation.where(code: code).where.not(id: id).exists?
    end
  end

  def sender_is_admin
    errors.add(:sender_id, :not_admin) unless sender.try(:admin?)
  end

  def same_team
    errors.add(:sender_id, :different_teams) unless sender.try(:team) == team
  end

  def not_already_registered
    errors.add(:member_id, :already_registered) if member.user.present?
  end

  def unique_email
    errors.add(:email, :taken) \
      if team.invitations.pending.where(email: email).where.not(id: id).exists?
  end
end

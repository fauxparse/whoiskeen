class InvitationSerializer < ApplicationSerializer
  attributes :code, :sender_id, :email, :last_sent_at, :status
  belongs_to :sender
  belongs_to :member
  belongs_to :team

  def last_sent_at
    object.updated_at
  end
end

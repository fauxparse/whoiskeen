class InvitationSerializer < ApplicationSerializer
  attributes :code, :sender_id, :email, :last_sent_at, :status

  def last_sent_at
    object.updated_at
  end
end

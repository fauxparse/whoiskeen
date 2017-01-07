class AcceptInvitation
  attr_reader :user, :invitation

  def initialize(user, invitation)
    @user = user
    @invitation = invitation
  end

  def call
    accept_invitation if can_accept?
  end

  private

  delegate :team, to: :invitation

  def accept_invitation
    invitation.member.update!(user: user)
    invitation.accepted!
  end

  def can_accept?
    invitation.pending? && !user.memberships.where(team_id: team.id).exists?
  end
end

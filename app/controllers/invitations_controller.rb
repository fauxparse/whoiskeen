class InvitationsController < ApplicationController
  def create
    invitation = Invitation.create(invitation_params)
    render json: invitation
  end

  def destroy
    invitation = Invitation.find_by(code: params[:id])
    invitation.cancelled! if can_cancel?(invitation)
    render json: invitation
  end

  private

  def invitation_params
    params
      .require(:invitation)
      .permit(:member_id, :sender_id, :email)
  end

  def can_cancel?(invitation)
    current_user.memberships.admin.where(team: invitation.team).exists?
  end
end

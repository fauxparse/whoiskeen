class InvitationsController < ApplicationController
  def show
    respond_to do |format|
      format.json do
        render json: invitation, include: %w(sender member team)
      end
    end
  end

  def create
    invitation = Invitation.create(invitation_params)
    render json: invitation
  end

  def destroy
    invitation.cancelled! if can_cancel?(invitation)
    render json: invitation
  end

  def accept
    AcceptInvitation.new(current_user, invitation).call
    render json: invitation
  end

  def decline
    invitation.declined!
    render json: invitation
  end

  private

  def invitation
    @invitation ||= Invitation.find_by(code: params[:id])
  end

  def invitation_params
    params
      .require(:invitation)
      .permit(:member_id, :sender_id, :email)
  end

  def can_cancel?(invitation)
    current_user.memberships.admin.where(team: invitation.team).exists?
  end
end

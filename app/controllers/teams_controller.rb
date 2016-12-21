class TeamsController < ApplicationController
  def index
    @memberships = current_user.memberships.includes(:team)
    respond_to do |format|
      format.json do
        render json: @memberships, each_serializer: MembershipSerializer
      end
    end
  end
end

class TeamsController < ApplicationController
  def index
    @memberships = current_user.memberships.includes(:team)
    respond_to do |format|
      format.json { render json: @memberships, include: [:team] }
    end
  end
end

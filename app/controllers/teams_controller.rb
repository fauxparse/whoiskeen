class TeamsController < ApplicationController
  def index
    respond_to do |format|
      format.json do
        render json: current_user.memberships.includes(:team), include: :team
      end
    end
  end

  def show
    respond_to do |format|
      format.json do
        render json: current_team, include: :members
      end
    end
  end

  private

  def team_id
    params[:id]
  end
end

class TeamsController < ApplicationController
  wrap_parameters :team, include: TeamForm.attributes

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

  def new; end

  def create
    respond_to do |format|
      format.json do
        form = TeamForm.new(Team.new, current_user, team_params)
        form.save
        render json: form.team
      end
    end
  end

  private

  def team_id
    params[:id]
  end

  def team_params
    return {} unless params[:team].present?
    params.require(:team).permit(*TeamForm.attributes)
  end
end

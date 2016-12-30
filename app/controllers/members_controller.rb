class MembersController < ApplicationController
  def index
  end

  def show
    respond_to do |format|
      format.json { render json: member }
    end
  end

  def create
    Rails.logger.info current_team.inspect
    @member = current_team.members.create(member_params)
    respond_to do |format|
      format.json { render json: member }
    end
  end

  def update
  end

  def destroy
  end

  private

  def member
    @member ||= current_team.members.find_by(slug: params[:id])
  end

  def member_params
    params.require(:member).permit(:name)
  end
end

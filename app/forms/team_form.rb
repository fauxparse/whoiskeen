class TeamForm
  attr_reader :team, :user

  def initialize(team, user, params)
    @team = team
    @user = user

    apply(params)
  end

  def self.attributes
    %i(name slug display_name)
  end

  def save
    valid? && team.save
  end

  delegate :valid?, :errors, to: :team

  private

  def apply(params)
    team.attributes = params.except(:display_name)

    if team.new_record?
      team.members.build(user: user, name: params[:display_name])
    end
  end
end

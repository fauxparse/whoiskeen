class MembershipSerializer < ApplicationSerializer
  attributes :id, :name, :display_name, :member_id

  delegate :team, to: :object

  def id
    team.to_param
  end

  def name
    team.name
  end

  def display_name
    object.name
  end

  def member_id
    object.to_param
  end
end

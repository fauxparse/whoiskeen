class TeamsController < ApplicationController
  def index
    render inline: 'Hi', layout: true
  end
end

class Api::V1::PlayersController < ApplicationController
  before_action :update_players, only: [:index]

  def index
    players = Player.all

    render json: players, status:200
  end

  def show
    player = Player.find(params[:id])

    render json: player, status:200
  end

  private

  def update_players
    players = Player.all

    players.each do |player|
      if Time.now - player.updated_at > 60
        player.cost = player.cost * rand(0.99..1.01)
        player.save
      end
    end
  end
end

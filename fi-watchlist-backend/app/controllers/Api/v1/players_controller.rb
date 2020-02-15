class Api::V1::PlayersController < ApplicationController

  def index
    players = Player.all

    render json: players, status:200
  end

  def show
    player = Player.find(params[:id])

    render json: player, status:200
  end
end

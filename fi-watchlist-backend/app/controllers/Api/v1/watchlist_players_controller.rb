class Api::V1::WatchlistPlayersController < ApplicationController

  def index
    watchlist_players = WatchlistPlayer.all

    render json: watchlist_players, status:200
  end

  def show
    watchlist_player = WatchlistPlayer.find(params[:id])

    render json: watchlist_player, status:200
  end
end

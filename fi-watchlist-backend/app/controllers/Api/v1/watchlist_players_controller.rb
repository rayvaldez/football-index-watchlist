class Api::V1::WatchlistPlayersController < ApplicationController

  def index
    watchlist_players = WatchlistPlayer.all

    render json: watchlist_players, status:200
  end

  def show
    watchlist_player = WatchlistPlayer.find(params[:id])

    render json: watchlist_player, status:200
  end

  def create
    watchlist_player = WatchlistPlayer.create(watchlist_player_params)

    render json: watchlist_player, status:200
  end

  def update
    watchlist_player = WatchlistPlayer.find(params[:id])

    watchlist_player.update(update_player_params)

    render json: watchlist_player, status:200
  end

  def destroy
    watchlist_player = WatchlistPlayer.find(params[:id])

    watchlist_player.destroy
  end

  private

  def watchlist_player_params
    params.require(:watchlist_player).permit(:player_id, :name, :team, :cost)
  end

  def update_player_params
    params.require(:watchlist_player).permit(:cost)
  end

end

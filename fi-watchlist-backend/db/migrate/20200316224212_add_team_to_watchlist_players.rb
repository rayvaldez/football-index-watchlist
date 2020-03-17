class AddTeamToWatchlistPlayers < ActiveRecord::Migration[6.0]
  def change
    add_column :watchlist_players, :team, :string
  end
end

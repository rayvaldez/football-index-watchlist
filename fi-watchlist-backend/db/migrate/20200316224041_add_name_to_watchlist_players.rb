class AddNameToWatchlistPlayers < ActiveRecord::Migration[6.0]
  def change
    add_column :watchlist_players, :name, :string
  end
end

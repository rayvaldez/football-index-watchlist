class CreateWatchlistPlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :watchlist_players do |t|
      t.decimal :cost, :precision => 8, :scale => 2
      t.references :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end

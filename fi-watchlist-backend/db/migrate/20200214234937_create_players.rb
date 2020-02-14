class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.string :team
      t.decimal :cost, precision: 8, scale: 2

      t.timestamps
    end
  end
end

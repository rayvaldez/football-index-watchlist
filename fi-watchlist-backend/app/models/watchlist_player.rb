class WatchlistPlayer < ApplicationRecord
  has_many :players

  validates :player_id, uniqueness: true
end

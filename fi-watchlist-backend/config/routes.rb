Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :players, only: [:index, :show]

      resources :watchlist_players
    end
  end
end

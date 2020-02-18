class WatchlistPlayersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/watchlist_players'
    this.playersUrl = 'http://localhost:3000/api/v1/players'
  }

  getWatchlistPlayers() {
    return fetch(this.baseUrl).then(res => res.json()
    )
  }  

  createWatchlistPlayer(playerJSON) {
    const watchlist_player = playerJSON
    return fetch(this.baseUrl,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(watchlist_player)
    }).then(res => res.json())
  }

  getPlayer(playerId) {
    return fetch(this.playersUrl + '/' + playerId).then(res => res.json()
    )
  }
}

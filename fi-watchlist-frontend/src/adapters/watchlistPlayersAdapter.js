class WatchlistPlayersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/watchlist_players';
    this.playersUrl = 'http://localhost:3000/api/v1/players';
  }

  getWatchlistPlayers() {
    return fetch(this.baseUrl).then(res => res.json()
    );
  }

  createWatchlistPlayer(playerJSON) {
    const watchlistPlayer = playerJSON;
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(watchlistPlayer),
    }).then((response) => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }).catch(error => alert('Error! Player has already been added.'));
  }

  getPlayer(playerId) {
    return fetch(this.playersUrl + '/' + playerId).then(res => res.json()
  );
  }

  updatePlayer(playerJSON) {
    return fetch(this.baseUrl + '/' + playerJSON.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(playerJSON),
    }).then(res => res.json());
  }

  removeWatchedPlayer(playerId) {
    const watchlistPlayerId = playerId;
    return fetch(this.baseUrl + '/' + watchlistPlayerId, {
      method: 'delete',
    })
    .then(() => {
      console.log('removed');
    }).catch(err => {
      console.error(err)
    });
  }

}

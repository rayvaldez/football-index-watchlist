class PlayersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/players'
  }

  getPlayers() {
    return fetch(this.baseUrl).then(res => res.json()
    )
  }

}

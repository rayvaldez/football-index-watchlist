class WatchlistPlayers {
  constructor() {
    this.watchlistPlayers = []
    this.adapter = new WatchlistPlayersAdapter()
    this.initiBindingsAndEventListeners()
    this.fetchWatchlistPlayers()
  }

  initiBindingsAndEventListeners() {
    this.playerClick = document.getElementById('market')
    this.playerClick.addEventListener('click', this.fetchAndLoadPlayer)
  }

  fetchWatchlistPlayers() {

  }

  fetchAndLoadPlayer(e) {
    e.preventDefault()
  }
}

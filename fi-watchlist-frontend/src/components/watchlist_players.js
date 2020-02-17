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
    return fetch(`${e.target}`)
    .then(res => res.json())
    .then(json => {
      document.getElementById('player-show-name').innerHTML = `<h4>Add ${json.name} to Watchlist?</h4>`
      document.getElementById('player-show-info').innerHTML = `
      <input type="hidden" id="player-id" value="${json.id}" />
      <input type="hidden" id="player-cost" value="${json.cost}" />
      <h6>Team - ${json.team}</h6> <br />
      <h6>Cost - £${json.cost}</h6>
      `
    })
  }
}

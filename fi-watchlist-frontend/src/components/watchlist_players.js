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
    this.addToWatchList = document.getElementById('player-submit')
    this.addToWatchList.addEventListener('click', this.createWatchlistPlayer.bind(this))
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

  createWatchlistPlayer(e) {
    e.preventDefault()
    const playerId = document.getElementById('player-id').value
    const playerCost = document.getElementById('player-cost').value
    const playerJSON = {player_id: playerId, cost: playerCost}
    console.log(playerId, playerCost, playerJSON)
  }
}

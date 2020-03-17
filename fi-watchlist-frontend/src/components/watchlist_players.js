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
    this.confirmPlayerRemove = document.getElementById('watchlist-players-table')
    this.confirmPlayerRemove.addEventListener('click', this.confirmRemove)
    this.removeWatchlistPlayer = document.getElementById('confirm-remove')
    this.removeWatchlistPlayer.addEventListener('click', this.removePlayer.bind(this))
  }

  fetchWatchlistPlayers() {
    this.adapter
    .getWatchlistPlayers()
    .then(watchlistPlayers => {
      watchlistPlayers.forEach(player => {
        console.log(player)
        this.appendPlayer(player.player_id, player)
      })
    })
  }

  fetchAndLoadPlayer(e) {
    e.preventDefault()
    return fetch(`${e.target}`)
    .then(res => res.json())
    .then(json => {
      document.getElementById('player-show-name').innerHTML = `<h4>Add ${json.name} to Watchlist?</h4>`
      document.getElementById('player-show-info').innerHTML = `
      <input type="hidden" id="player-id" value="${json.id}" />
      <input type="hidden" id="player-name" value="${json.name}" />
      <input type="hidden" id="player-team" value="${json.team}" />
      <input type="hidden" id="player-cost" value="${json.cost}" />
      <h6>Team - ${json.team}</h6> <br />
      <h6>Cost - £${json.cost}</h6>
      `
    })
  }

  createWatchlistPlayer(e) {
    e.preventDefault()
    const playerId = document.getElementById('player-id').value
    const playerName = document.getElementById('player-name').value
    const playerTeam = document.getElementById('player-team').value
    const playerCost = document.getElementById('player-cost').value
    const playerJSON = {player_id: playerId, name: playerName, team: playerTeam, cost: playerCost}
    this.adapter.createWatchlistPlayer(playerJSON).then(watchlistPlayer => {
      this.appendPlayer(watchlistPlayer.player_id, watchlistPlayer)
    })
  }

  appendPlayer(playerId, watchlistPlayer) {
    this.adapter
    .getPlayer(playerId)
    .then(json => {
      const playerHTML = `
      <tr>
      <td>${json.name}</td>
      <td>${json.team}</td>
      <td>£${watchlistPlayer.cost}</td>
      <td>£${json.cost}</td>
      <td class="cost">£${(json.cost - watchlistPlayer.cost).toFixed(2)}</td>
      <td><button type="button" data-id="${watchlistPlayer.id}" class="btn btn-secondary btn-sm" data-toggle="modal" data-target="#exampleModalCenter">Remove</button></td>
      </tr>
      `
      // <td><button type="button" class="btn btn-secondary btn-sm" id="remove-player">Remove</button></td>
      const table = document.getElementById('watchlist-players-table').getElementsByTagName('tbody')[0];
      const newRow = table.insertRow(table.rows.length)
      newRow.innerHTML = playerHTML
      newRow.id = watchlistPlayer.id
      $('td.cost').css('color', 'green')
      $('td.cost:contains(-)').css('color', 'red')
    })
  }

  confirmRemove(e) {
    e.preventDefault()
    document.getElementById('remove-player-content').innerHTML = `
    <h5>Remove Player?</h5>
    <input type="hidden" id="remove-player-id" value="${e.target.dataset.id}"/>
    `
  }

  removePlayer(e) {
    e.preventDefault()
    const removePlayerId = document.getElementById('remove-player-id').value
    const table = document.getElementById('watchlist-players-table');
    const tbody = table.getElementsByTagName('tbody')[0]
    const row = this.confirmPlayerRemove.getElementsByTagName('tr').namedItem(removePlayerId)
    this.adapter.removeWatchedPlayer(removePlayerId)
    tbody.removeChild(row)
  }
}

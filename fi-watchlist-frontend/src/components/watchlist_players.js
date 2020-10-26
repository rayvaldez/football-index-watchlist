class WatchlistPlayers {
  constructor() {
    this.watchlistPlayers = [];
    this.adapter = new WatchlistPlayersAdapter();
    this.initiBindingsAndEventListeners();
    this.fetchWatchlistPlayers();
  }

  initiBindingsAndEventListeners() {
    this.playerClick = document.getElementById('market');
    this.playerClick.addEventListener('click', this.fetchAndLoadPlayer);
    this.addToWatchList = document.getElementById('player-submit');
    this.addToWatchList.addEventListener('click', this.createWatchlistPlayer.bind(this));
    this.confirmUpdatePlayer = document.getElementById('confirm-update');
    this.confirmUpdatePlayer.addEventListener('click', this.confirmUpdate.bind(this));
    this.confirmPlayerRemove = document.getElementById('watchlist-players-table');
    this.confirmPlayerRemove.addEventListener('click', this.confirmRemove);
    this.removeWatchlistPlayer = document.getElementById('confirm-remove');
    this.removeWatchlistPlayer.addEventListener('click', this.removePlayer.bind(this));
  }

  fetchWatchlistPlayers() {
    this.adapter
    .getWatchlistPlayers()
    .then(watchlistPlayers => {
      watchlistPlayers.forEach(player => {
        this.appendPlayer(player);
      });
    });
  }

  fetchAndLoadPlayer(e) {
    e.preventDefault();
    return fetch(`${e.target}`)
    .then(res => res.json())
    .then(json => {
      document.getElementById('player-show-name').innerHTML =
        `<h4>Add ${json.name} to Watchlist?</h4>`;
      document.getElementById('player-show-info').innerHTML = `
        <input type="hidden" id="player-id" value="${json.id}" />
        <input type="hidden" id="player-name" value="${json.name}" />
        <input type="hidden" id="player-team" value="${json.team}" />
        <input type="hidden" id="player-cost" value="${json.cost}" />
        <h6>Team - ${json.team}</h6> <br />
        <h6>Cost - £${json.cost}</h6>
      `;
    });
  }

  createWatchlistPlayer(e) {
    e.preventDefault();
    const playerId = document.getElementById('player-id').value;
    const playerName = document.getElementById('player-name').value;
    const playerTeam = document.getElementById('player-team').value;
    const playerCost = document.getElementById('player-cost').value;
    const playerJSON = {
      player_id: playerId,
      name: playerName,
      team: playerTeam,
      cost: playerCost, };
    this.adapter.createWatchlistPlayer(playerJSON).then(watchlistPlayer => {
      this.appendPlayer(watchlistPlayer);
    });
  }

  appendPlayer(watchlistPlayer) {
    const playerHTML = `
      <tr>
      <td>${watchlistPlayer.name}</td>
      <td>${watchlistPlayer.team}</td>
      <td>£${watchlistPlayer.cost}</td>
      <td class=${watchlistPlayer.id}-current-cost></td>
      <td class=${watchlistPlayer.id}-difference></td>
      <td><button type="button" data-id="${watchlistPlayer.id}"
        class="btn btn-secondary btn-sm"
        data-toggle="modal"
        data-target="#exampleModalCenter">Update/Remove</button></td>
      </tr>
      `;

    const table = document.getElementById('watchlist-players-table')
      .getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.rows.length);
    newRow.innerHTML = playerHTML;
    newRow.id = watchlistPlayer.id;

    this.getCurrentCost(watchlistPlayer);
  }

  getCurrentCost(player) {
    this.adapter
    .getPlayer(player.player_id)
    .then(json => {
      $(`td.${player.id}-current-cost`).text(`£${json.cost}`);
      $(`td.${player.id}-difference`).text(`£${(json.cost - player.cost)
        .toFixed(2)}`);
      $(`td.${player.id}-difference`).css('color', 'green');
      $(`td.${player.id}-difference:contains(-)`).css('color', 'red');
    });
  }

  confirmRemove(e) {
    e.preventDefault();
    const cost = $(`td.${e.target.dataset.id}-current-cost`).text().substr(1);
    document.getElementById('remove-player-content').innerHTML = `
    <h5>Update/Remove Player?</h5> <br />
    <p>Updating will reset the cost.</p>
    <input type="hidden" id="remove-player-id" value="${e.target.dataset.id}"/>
    <input type="hidden" id="update-current-cost" value="${cost}" />
    `;
  }

  confirmUpdate(e) {
    e.preventDefault();
    const playerId = document.getElementById('remove-player-id').value;
    const currentPlayerCost = document.getElementById('update-current-cost')
      .value;
    const playerJSON = { id: playerId, cost: currentPlayerCost };

    this.adapter
    .updatePlayer(playerJSON)
    .then(
      $('#watchlist-players-table tbody').text('')
    ).then(() => this.fetchWatchlistPlayers());
  }

  removePlayer(e) {
    e.preventDefault();
    const removePlayerId = document.getElementById('remove-player-id').value;
    const table = document.getElementById('watchlist-players-table');
    const tbody = table.getElementsByTagName('tbody')[0];
    const row = this.confirmPlayerRemove.getElementsByTagName('tr')
      .namedItem(removePlayerId);
    this.adapter.removeWatchedPlayer(removePlayerId);
    tbody.removeChild(row);
  }
}

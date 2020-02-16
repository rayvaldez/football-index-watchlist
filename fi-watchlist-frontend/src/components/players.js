class Players {
  constructor() {
    this.players = []
    this.player = {}
    this.adapter = new PlayersAdapter()
    this.initiBindingsAndEventListeners()
    this.fetchAndLoadPlayers()
  }

  initiBindingsAndEventListeners() {
    this.playersTable = document.getElementById('players-table')
  }

  fetchAndLoadPlayers() {
    this.adapter
    .getPlayers()
    .then(players => {
      players.forEach(player => this.players.push(new Player(player)))
    })
    .then(() => {
      this.players.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost))
    })
    .then(() => {
      this.renderPlayers()
    })
  }

  renderPlayers() {
    document.getElementById('players-table').getElementsByTagName('tbody')[0].innerHTML = this.players.map(player => player.renderTd()).join('')
  }
}

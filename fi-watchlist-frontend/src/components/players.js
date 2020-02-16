class Players {
  constructor() {
    this.players = []
    this.player = {}
    this.adapter = new PlayersAdapter()
    this.initBindingsAndEventListeners()
    this.fetchAndLoadPlayers()
  }

  
}

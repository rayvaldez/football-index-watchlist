class Player {
  constructor(playerJSON) {
    this.id = playerJSON.id;
    this.name = playerJSON.name;
    this.team = playerJSON.team;
    this.cost = playerJSON.cost;
  }

  static fetchAndLoadPlayers() {
    const playerAdapter = new PlayersAdapter();
    playerAdapter.getPlayers()
    .then(players => {
      players.forEach(player => this.all.push(new Player(player)));
    })
    .then(() => {
      this.all.sort((a, b) => parseFloat(b.cost) - parseFloat(a.cost));
    })
    .then(() => {
      this.renderPlayers();
    });
  }

  static renderPlayers() {
    Player.table.innerHTML = this.all.map(player => player.renderTd()).join('');
  }

  renderTd() {
    return `
      <tr>
        <td><a href="http://localhost:3000/api/v1/players/${this.id}"
          data-id="${this.id}" class="index-player" data-toggle="modal"
          data-target="#playerModal">${this.name}</a></td>
        <td>${this.team}</td>
        <td>£${this.cost}</td>
      </tr>
          `;
  }

}

Player.all = [];

Player.table = document.getElementsByTagName('tbody')[1];

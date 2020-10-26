class Player {
  constructor(playerJSON) {
    this.id = playerJSON.id;
    this.name = playerJSON.name;
    this.team = playerJSON.team;
    this.cost = playerJSON.cost;
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

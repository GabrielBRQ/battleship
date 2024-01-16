const game = {
  rounds: 1,
  AIPlayed: false,
  AIAttacks: [],
};

function changeTurn() {
  game.rounds++;
}

export {
  game,
  changeTurn
}
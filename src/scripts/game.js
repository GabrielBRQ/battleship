const game = {
  rounds: 1,
  AIAttacks: [],
};

function changeTurn() {
  game.rounds++;
}

export {
  game,
  changeTurn
}
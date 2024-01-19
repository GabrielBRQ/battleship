class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
    this.isShipSunk = false;
  }

  hit() {
    // Increase hits and call checkSunk
    this.hits++;
    this.checkSunk();
  }

  checkSunk() {
    // Check if this ship was sunk
    if (this.hits >= this.size) {
      this.isShipSunk = true;
    }
  }
}

function createShip(size) {
  return new Ship(size);
}

export { Ship, createShip };

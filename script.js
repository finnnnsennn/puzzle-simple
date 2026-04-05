// Mendeklarasikan puzzle tiles (angka 1-8 dan 1 kosong)
const tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];

const puzzleGrid = document.getElementById("puzzleGrid");
const shuffleButton = document.getElementById("shuffleButton");
const gameStatus = document.getElementById("gameStatus");

// Membuat tile HTML
function createTiles() {
  puzzleGrid.innerHTML = "";
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.classList.add("tile");
    if (tile === null) {
      tileElement.classList.add("empty");
    } else {
      tileElement.textContent = tile;
      tileElement.addEventListener("click", () => moveTile(index));
    }
    puzzleGrid.appendChild(tileElement);
  });
}

// Menggeser tile jika bersebelahan dengan tile kosong
function moveTile(index) {
  const emptyIndex = tiles.indexOf(null);
  const validMoves = [
    index - 1, // Ke kiri
    index + 1, // Ke kanan
    index - 3, // Ke atas
    index + 3, // Ke bawah
  ];

  if (validMoves.includes(emptyIndex) && areValidNeighbors(index, emptyIndex)) {
    tiles[emptyIndex] = tiles[index];
    tiles[index] = null;
    createTiles();

    if (checkWin()) {
      gameStatus.textContent = "Selamat! Anda berhasil menyelesaikan puzzle!";
    }
  }
}

// Memastikan tile berada di grid (tidak geser keluar baris)
function areValidNeighbors(index, emptyIndex) {
  if (Math.floor(index / 3) === Math.floor(emptyIndex / 3)) {
    return true; // Baris yang sama
  }
  return Math.abs(index - emptyIndex) === 3; // Bersebelahan secara vertikal
}

// Mengacak posisi tile
function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  gameStatus.textContent = "";
  createTiles();
}

// Mengecek apakah angka sudah sesuai urutan
function checkWin() {
  const winningTiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
  return tiles.every((tile, index) => tile === winningTiles[index]);
}

// Event untuk tombol shuffle
shuffleButton.addEventListener("click", shuffleTiles);

// Inisialisasi puzzle
createTiles();

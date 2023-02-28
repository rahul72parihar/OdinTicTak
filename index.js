const table = document.getElementById("table");
const result = document.getElementById("result");
const resetBtn = document.getElementById("reset");
let matrix = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let currSymbol = "O";
let playing = true;
function renderGrid() {
  const grid = document.createDocumentFragment();
  matrix.forEach((curr, i) => {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("row", i);
      cell.setAttribute("col", j);
      cell.innerText = matrix[i][j];
      row.appendChild(cell);
    }
    grid.appendChild(row);
  });
  table.replaceChildren(grid);
}
renderGrid();
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cell")) handleClick(e);
});
function handleClick(e) {
  let r = e.target.getAttribute("row");
  let c = e.target.getAttribute("col");
  if (matrix[r][c] !== "" || !playing) return;
  matrix[r][c] = currSymbol;
  renderGrid();
  if (gameWon()) {
    gameOver();
    return;
  }
  if (isTie()) {
    handleTie();
    return;
  }
  changeCurrSymbol();
  console.log(r, c);
}
// LOGIC FUNCTION
function changeCurrSymbol() {
  if (currSymbol === "X") currSymbol = "O";
  else currSymbol = "X";
}
function gameWon() {
  for (let i = 0; i < 3; i++) {
    let won = true;
    for (let j = 1; j < 3; j++) {
      if (matrix[i][j] !== matrix[i][0]) won = false;
      if (matrix[i][j] === "") won = false;
    }
    if (won) return true;
  }
  for (let j = 0; j < 3; j++) {
    let won = true;
    for (let i = 1; i < 3; i++) {
      if (matrix[i][j] !== matrix[0][j]) won = false;
      if (matrix[i][j] === "") won = false;
    }
    if (won) return true;
  }
  if (
    matrix[0][0] === matrix[1][1] &&
    matrix[1][1] === matrix[2][2] &&
    matrix[1][1] !== ""
  )
    return true;
  if (
    matrix[0][2] === matrix[1][1] &&
    matrix[1][1] === matrix[2][0] &&
    matrix[1][1] !== ""
  )
    return true;
  return false;
}
function gameOver(tie) {
  console.log("gameWon");
  playing = false;
  result.textContent = `${currSymbol} have won the game`;
  if (tie) result.textContent = "TIE GAME";
  resetBtn.style.display = "inline-block";
  currSymbol = "O";
}

//Handle Reset
resetBtn.addEventListener("click", handleReset);
function handleReset() {
  matrix = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  playing = true;
  resetBtn.style.display = "none";
  renderGrid();
  result.textContent = "";
}
//HandleTie
function isTie() {
  let areAllEmpty = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[i][j] === "") areAllEmpty = false;
    }
  }
  if (areAllEmpty) {
    gameOver(true);
  }
}

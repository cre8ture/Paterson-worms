// Get the ASCII container element from the document
const container = document.getElementById("asciiContainer");
// const container = document.querySelector("body");
let animId;
const numSteps = 1000;
// Define the characters used for ASCII shading
// const density = "Ñ@#W$9876543210?!abc;:+=-,._";
// Define the characters used for ASCII shading
const density = "Ñ@#W$9".split('')//  "█▓▓▒░ ".split('')

// Set the number of rows and columns for the ASCII grid
const rows = 40;
const cols = 40;

let wormY = rows/2
let wormX = cols/2
let wormDir = 0

const grid = [];
const dirs = [];
for (let y = 0; y < rows; y++) {
  grid[y] = [];
  dirs[y] = [];
  for (let x = 0; x < cols; x++) {
    // Initialize all cells as not visited
    grid[y][x] = false;
    // Initialize all directions as not traversed
    dirs[y][x] = [false, false, false, false, false, false];
  }
}

console.log("grid", grid)
console.log("dirs", dirs)
// Loop to initialize the ASCII grid with spans and line breaks
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    // Create a new span element for each ASCII character
    const span = document.createElement("span");
    // Append the span to the container
    // grid[y*cols + x] = false
    // dirs[y*cols + x] = false
    container.appendChild(span);
  }
  // After each row, append a line break to start a new line
  container.appendChild(document.createElement("br"));
}

// Select all span elements in the container (representing each ASCII character)
const chars = container.querySelectorAll("span");

// Initialize a frame counter for animation
let frame = 0;

// Define the colors used for ASCII shading
// const colors = "Ñ@#W$9876543210?!abc;:+=-,._ ";
// Define the colors used for ASCII shading
const colors = [
  "rgb(0, 50, 0)",   // Dark Green
  "rgb(0, 100, 0)",  // Medium Dark Green
  "rgb(0, 150, 0)",  // Medium Green
  "rgb(0, 200, 0)",  // Medium Light Green
  "rgb(0, 255, 0)",  // Light Green
  "rgb(127, 255, 127)",  // Lighter Green
  "rgb(192, 255, 192)"  // Lightest Green
];

const directionDeltas = [
  { x: 0, y: -1 },  // Up
  { x: 1, y: -1 },  // Up-right
  { x: 1, y: 0 },   // Down-right
  { x: 0, y: 1 },   // Down
  { x: -1, y: 1 },  // Down-left
  { x: -1, y: 0 }   // Up-left
];

const dirRatio = density.length / directionDeltas.length
// Define the function to update the worm's position and direction
function updateWorm(x, y, grid, dirs) {
  console.log("noodle", wormX, wormY)
  // Get the array of traversed directions for the current point
  // Check if wormY and wormX are within the valid range
  if (wormY < 0 || wormY >= grid.length || wormX < 0 || wormX >= grid[0].length) {
    // The worm has moved outside the grid
    return false;
  }

  
// Run the simulation for a certain number of steps
// for (let step = 0; step < numSteps; step++) {
  // Choose a new direction for the worm
  const newDir = chooseDirection(wormDir, dirs[wormY][wormX]);

  // Update the worm's direction
  wormDir = newDir;

  // Mark the new direction as traversed for the current cell
  dirs[wormY][wormX][newDir] = true;

  console.log("i am newDir", newDir)
  // Move the worm to the new cell
  // The specifics of how you update wormX and wormY depend on how you're representing directions
  // This is just a placeholder
  wormX += directionDeltas[newDir].x;
  wormY += directionDeltas[newDir].y;

  // Check if the worm has moved off the grid
  if (wormX < 0 || wormX >= cols || wormY < 0 || wormY >= rows) {
    // The worm dies
chars[wormY * cols + wormX].textContent = 'X'

    // break;
    // Later in your code, you can cancel the animation frame like this:
cancelAnimationFrame(animId);
  }

  // Check if the worm has encountered this distribution before
  const untraversedDirs = dirs[wormY][wormX].filter(dir => !dir);
  if (untraversedDirs.length === 0) {
    // The worm dies
    chars[wormY * cols + wormX].textContent = 'X'

    // break;
    // Later in your code, you can cancel the animation frame like this:
cancelAnimationFrame(animId);
  }

  console.log("POOEE wormY * cols + wormX", wormY * cols + wormX)
// chars[wormY * cols + wormX].textContent = density[wormDir*dirRatio]
if(chars[wormY * cols + wormX].style.backgroundColor === chars[wormY * cols + wormX].parentNode.style.backgroundColor){
  chars[wormY * cols + wormX].style.backgroundColor = colors[wormDir*dirRatio]
}
else
chars[wormY * cols + wormX].style.backgroundColor = chars[wormY * cols + wormX].parentNode.style.backgroundColor

// }
// console.log("SIMULATION COMPLETE")
}

function updateDir(currentPos, direction) {
  // Assuming direction is either -1 (left), 0 (stay), or 1 (right)
  return currentPos + direction;
}

// Define a function to print the grid to the console
// function printGrid() {
//   for (let y = 0; y < rows; y++) {
//     let row = '';
//     for (let x = 0; x < cols; x++) {
//       if (x === wormX && y === wormY) {
//         row += 'W';
//       } else if (grid[y][x].some(dir => dir)) {
//         row += '*';
//       } else {
//         row += ' ';
//       }
//       chars[y * cols + x].textContent = density[currentState[y][x]]
//     }
//     console.log(row);
//   }
// }

// Run the simulation
// while (updateWorm()) {
//   printGrid();
// }
function chooseDirection(wormDir, cellDirs) {
  // Count the number of traversed directions
  const traversedCount = cellDirs.filter(dir => dir).length;

  console.log("i am traversedCount", traversedCount, cellDirs)
  switch (traversedCount) {
    case 0:
      // If the worm encounters a node with no eaten segments, it can either make a sharp turn or a gentle one.
      // This is just a placeholder. You should replace it with your logic for choosing a direction.
      return (wormDir + 1) % 6;

    case 1:
      // If it encounters a node with one eaten segment, it can leave along any of the remaining four.
      // This is just a placeholder. You should replace it with your logic for choosing a direction.
      return (wormDir + 2) % 6;

    case 2:
      // For two eaten segments, there are four distinct approach directions, each of which offers a choice of three departure directions.
      // This is just a placeholder. You should replace it with your logic for choosing a direction.
      return (wormDir + 3) % 6;

    case 3:
      // If the worm returns to the origin, it will encounter three eaten segments and must choose between the two remaining uneaten ones.
      // This is just a placeholder. You should replace it with your logic for choosing a direction.
      return (wormDir + 4) % 6;

      case 4:
        const posIndices = [];
        cellDirs.forEach((dir, i) => {
          if (dir) {
            posIndices.push(i);
          }
        });
        return posIndices[(Math.random() * posIndices.length) | 0];
    default:
      // This should never happen
      throw new Error('Invalid state');
  }
}


// Function to update each frame of the animation
function updateFrame() {
  updateStats() // Update stats
  // updateMatrixDisplay() // Update matrix display

 // Initialize the next state of the game
  // console.log("updateFRAME")


    // main(antX, antY, currentState)
    updateWorm(wormX, wormY, grid, dirs)
  // Increment the frame counter
  frame++;
  // Request the next frame of the animation
 animId = requestAnimationFrame(updateFrame);
}
const timeEl = document.getElementById('time')
const fpsEl = document.getElementById('fps')
const frameEl = document.getElementById('frame')
const aliveEl = document.getElementById('alive')
const matrixEl = document.getElementById('matrix')

// Function to update stats
function updateStats() {
  // Calculate the number of alive cells
  // let aliveCells = currentState.flat().filter(x => x).length;

  // Get the current time
  let currentTime = new Date().toLocaleTimeString();

  // Calculate FPS (frames per second)
  let fps = frame / ((Date.now() - startTime) / 1000);

  // Update the content of the respective elements
timeEl.textContent = `Time: ${currentTime}`;
fpsEl.textContent   = `FPS: ${fps.toFixed(2)}`;
frameEl.textContent = `Frame: ${frame}`;
// aliveEl.textContent  = `Alive Cells: ${aliveCells}`;
}

// Function to update matrix display
function updateMatrixDisplay() {
  // Convert the matrix to a string
  let matrixString = currentState.map(row => row.map(cell => cell ? '1' : '0').join(' ')).join('\n');
  // Update the content of the matrix element
  matrixEl.textContent = matrixString;
}

// Initialize a start time for FPS calculation
let startTime = Date.now();

// Call the updateStats function whenever the game state changes
// For example, you might call it in your main game loop


// Start the animation
updateFrame();
// updateWorm(wormX, wormY, grid, dirs)
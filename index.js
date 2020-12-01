const myGameArea = {
  canvas: document.createElement('canvas'),
  frames: 0,
  score: 0,
  objectsSpeed: 3,
  initialize: function () {
    initializeGameArea();
  },
  createCanvas: function () {
    this.canvas.width = 1000;
    this.canvas.height = 350;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  lose: function () {
    this.stop();
    document.getElementById("end-screen").style.display = "block";
    document.getElementById('dead').play('./sounds/yoshi-dead.mp3');
  },
  start: function () {
    this.interval = setInterval(updateGameArea, 17);
    document.getElementsByTagName("canvas")[0].style.display = "block";
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  }
}

function replayGame() {
  document.getElementById("end-screen").style.display = "none"; 
  myGameArea.frames = 0;
  myGameArea.score = 0;
  newObstaclesArray = [];
  myGameArea.initialize();
  myGameArea.start();
  let inputForm = document.getElementById('score-form');
  inputForm.style.display = "block";
}

function startGame() {
  document.getElementById("start-screen").style.display = "none"; 
  myGameArea.createCanvas();
  myGameArea.initialize();
  myGameArea.start();
  document.getElementById('theme-song').play('./sounds/CYBYWY-theme-song.mp3');
}

class Component {
  constructor(x, y, color, width, height, type, image) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.type = type;
    this.image = image;
    // speed properties
    this.speedX = 0;
    this.speedY = 0;
  }

  // newPos()
  newPos() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  left() {
    return this.x;2
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right()-2 < obstacle.left() ||
      this.left()-2 > obstacle.right()
    );
  }
}


class Player extends Component {
  constructor(x, y, color, width, height) {
    super(x, y, color, width, height);
    this.jumps = 0;
    this.img = document.createElement('img');
    this.img.src = "./img/player/hands-point-right.png";
  }

  update() {
    const ctx = myGameArea.context;
    ctx.fillStyle = this.color;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  jump() {
    if (this.jumps < 2) {
      this.speedY = -6.5;
      this.jumps++;
      return true;
    } else {
      return false;
    }
  }

  gravity() {
    let gravity = 0.27;
    if (this.y + this.speedY < myGameArea.canvas.height - 28) {
      this.speedY += gravity;
    } else {
      this.speedY = 0;
      this.jumps = 0;
      this.y = myGameArea.canvas.height - 28;
    }
  }

  crashWith(obstacle) {
    return !(
      this.bottom()-2 < obstacle.top() ||
      this.top()-2 > obstacle.bottom() ||
      this.right()-10 < obstacle.left() ||
      this.left()-2 > obstacle.right()
    );
  }
}



 const gameState = {
  currentState: "menu", // If it is Menu, game is stopped and menu appears, if it is gaming, game resume and frames updates
  currentLevel: "level1",
  level1: [
    {space: "Bedroom1", state: "private", background:"./img/backgrounds/Bedroom1-Background.png",fromX: 0, toX: 1000},
    {space: "Office", state: "public", background:"./img/backgrounds/Office-Background.png", fromX: 1001, toX: 2000},
    {space: "kitchen", state: "public", background:"./img/backgrounds/Kitchen-Background.png", fromX: 2001, toX: 3000},
    {space: "toilets", state: "private", background:"./img/backgrounds/Toilets-Background.png", fromX: 3001, toX: 4000},
    {space: "Bathroom1", state: "private", background:"./img/backgrounds/Bathroom1-Background.png", fromX: 4001, toX: 5000},
    {space: "Hallway", state: "public", background:"./img/backgrounds/Hallway-Background.png",fromX: 5001, toX: 6000},
    {space: "Bedroom2", state: "private", background:"./img/backgrounds/Bedroom2-Background.png", fromX: 6001, toX: 7000},
    {space: "Garage", state: "public", background:"./img/backgrounds/Garage-Background.png", fromX: 7001, toX: 8000},
    {space: "Garden", state: "public", background:"./img/backgrounds/Garden-Background.png", fromX: 8001, toX: 9000},
    {space: "Supermarket", state: "public", background:"./img/backgrounds/Supermarket-Background.png", fromX: 9001, toX: 10000},
    {space: "Classroom", state: "public", background:"./img/backgrounds/Classroom-Background.png", fromX: 10001, toX: 11000},
    {space: "Bathroom2", state: "public", background:"./img/backgrounds/Bathroom2-Background.png", fromX: 11001, toX: 12000},
   ],
} 
/*
const gameState = {
  //currentState: "menu", // If it is Menu, game is stopped and menu appears, if it is gaming, game resume and frames updates
  currentLevel: "level1",
  level1: [
    {space: "Bedroom1", state: "private", background:"./img/backgrounds/Bedroom1-Background.png",fromX: 0, toX: 1000},
    {space: "Office", state: "public", background:"./img/backgrounds/Office-Background.png", fromX: 1001, toX: 2000},
    {space: "Garden", state: "public", background:"./img/backgrounds/garden-background.png", fromX: 2001, toX: 3000},
    {space: "toilets", state: "private", background:"./img/backgrounds/Toilets-Background.png", fromX: 3001, toX: 4000},
    {space: "Supermarket", state: "public", background:"./img/backgrounds/Supermarket-Background.png", fromX: 4001, toX: 5000},
    {space: "Bedroom2", state: "private", background:"./img/backgrounds/Bedroom2-background.png", fromX: 5001, toX: 6000},
    {space: "Classroom", state: "public", background:"./img/backgrounds/Classroom-Background.png", fromX: 6001, toX: 7000},
   ],
} */

// * Creating an HTML empty element to contain all the IMG elements
// * We are doing this together with the appenChild method below in order to then have an HTML Collection to loop through
// ! Can't use a normal Javascript array to containt HTML Elements
var backgroundArray = document.createDocumentFragment(); 
function state (gameState, frames){ // * The meaning of this function is to check wether we are in a public or private based on the frame we are looking for
  frames = parseInt(frames);
  let space = gameState.level1.filter(obj => { // * Creating a new array containing only the object which has fromX < frames < toX 
    if ( frames >= obj.fromX && frames <= obj.toX) { 
      return true; // * The True here is to make the "filter" method work, filter will loop through the array returning the objects which pass True to the test given
    } 
  })
  return space[0].state; // * Even if we know the the filter function will return only 1 object, it is still an array containing one object, so we will need to access it at the first index first, and then get the state value
}

let newObstaclesArray = [];
let player;

// * Difficulties // Still to figure them out
// * Hard randomPlacement < 0.5 && consequentlyPlaces < 2, x += 50;
// * Medium randomPlacement < 0.5 && consequentlyPlaces < 2, x += 55;
// * Easy randomPlacement < 0.5 && consequentlyPlaced < 1, x+= 60;
function initializeGameArea() {

  let personWatching = document.createElement('img');
  personWatching.src = './img/enemies/observation.png';

  player = new Player(20, myGameArea.canvas.height-28, "red", 28, 28);
  let level = gameState.currentLevel;
  let lastSpaceIndex = gameState[level].length-1;
  let consequentlyPlaced = 0;
  for (let x = 0; x < gameState[level][lastSpaceIndex].toX ; x += 50) { // * New random generation obstacle function, More tweakable, do not makes things overlap
    let randomPlacement = Math.random();
    if (randomPlacement < 0.5 && consequentlyPlaced < 2) {
      consequentlyPlaced++;
      if (state(gameState, x) === 'public') {
        const injectObstacle = Math.random()  
        if (injectObstacle < 0.5) {
          spawnPersonWatching(x, personWatching);
        } else {
          spawnNewCollectible(x);
        } 
      } else  if (state(gameState, x) === 'private') { 
        spawnNewCollectible(x);
      }
    } else {
      consequentlyPlaced = 0;
      x += 75;
    }
  }

  // Declare obstacle array
  let currentLevel = gameState.currentLevel // * Accessing the current level
  for (let i = 0; i < gameState[currentLevel].length; i++) { 
    if ("background" in gameState[currentLevel][i]) { // * Checking if the space in the level has the background key, it should always have one in order to draw the background
      let backgroundURL = gameState[currentLevel][i].background; // * Getting the url in the background key
      let image = document.createElement("img"); // * Creating a new IMG element
      image.src = backgroundURL; // * Assigning the backgroundURL to the src of the newly created IMG element
      backgroundArray.appendChild(image); // * Appending the IMG element to the HTML empty element in order to have an HTML Collection
    }
  }
}

function updateGameArea() {
  myGameArea.clear();
  myGameArea.context.strokeRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  updateBackround();
  drawScore();
  updateObstacles();
  player.newPos();
  player.update();
  player.gravity();
  checkCollision();  
  myGameArea.frames += myGameArea.objectsSpeed;
  checkEndLevel();
};

function updateBackround() {
  for (let i = 0; i < backgroundArray.childNodes.length; i++) { // * Looping through the HTML Collection containing all the IMG elements
    myGameArea.context.drawImage(backgroundArray.childNodes[i], (i*1000)-myGameArea.frames, 0, 1000, 350); // * Drawing each background IMG elements at i*1000, which is the spacing between spaces 
  }
}

function drawScore() {
  myGameArea.context.fillStyle = "black";
  myGameArea.context.font = "20px Arial";
  myGameArea.context.fillText("Score: " + myGameArea.score, 20, 20);
}

function updateObstacles() {
  for (let i = 0; i < newObstaclesArray.length; i++) {
    newObstaclesArray[i].newPos();
    newObstaclesArray[i].update();
  }
}


function checkCollision() {
  const collisionObjArr = newObstaclesArray.filter((obstacle) => { // * Creating a new array containing only the objects which returns true from the crashWith method
    return player.crashWith(obstacle)
  })
  // * IF COLLIDING WITH SOMETHING
  if (collisionObjArr.length) {
    if (state(gameState, myGameArea.frames) === "public") { //IF COLLIDING WITH SOMETHING WHILE IN PUBLIC
      let endScreenTitle = document.getElementById("end-screen-title");
      let endScreenMessage = document.getElementById("end-screen-message");
      endScreenTitle.innerHTML = "GAME OVER!"
      endScreenMessage.innerHTML = "Even if you didn't reach the end of the level, your health is more important! <br> Scroll down to see how to check yourself!"
      myGameArea.lose();
    } else if (state(gameState, myGameArea.frames) === "private") { //IF COLLIDING WITH SOMETHING WHILE IN PRIVATE
      myGameArea.score++;
      collisionObjArr.forEach((obstacle) => {
        let obstacleIndex = newObstaclesArray.indexOf(obstacle); 
        newObstaclesArray.splice(obstacleIndex, 1);
      })
    }
  }
}


function checkEndLevel() {
  let levelArray = gameState[gameState.currentLevel];
  let lastSpace = levelArray[levelArray.length-1];
  if (myGameArea.frames >= lastSpace.toX) {
    myGameArea.stop();
    let endScreenTitle = document.getElementById("end-screen-title");
    let endScreenMessage = document.getElementById("end-screen-message");
    endScreenTitle.innerHTML = "CONGRATULATION!";
    endScreenMessage.innerHTML = "You made it to the end! <br> Scroll down to see how to check yourself!";
    document.getElementById("end-screen").style.display = "block";
  }
}


document.addEventListener('keydown', (e) => {
  if (e.code === "Space") {
    if(player.jump()) {
      let audio = document.getElementById('jump');
      audio.currentTime = 0;
      audio.play();
    }
  }
})

function randomCollectible() {
  let random = Math.random();
  let collectibleImg = document.createElement('img');
  if (random < 0.5) {
    collectibleImg.src = './img/collectibles/small-boobs.png'
  } else {
    collectibleImg.src = './img/collectibles/small-balls.png'
  }
  return collectibleImg;
}


function spawnPersonWatching(x, personWatching) {
  const newPerson = new Component(x, 315, "purple", 35, 35, "people", personWatching);
  newPerson.speedX -= myGameArea.objectsSpeed;
  newObstaclesArray.push(newPerson);
}

function spawnNewCollectible(x) {
  const newCollectible = (new Component(x, randomHeight(), "green", 45, 27, "boob", randomCollectible()));
  newCollectible.speedX -= myGameArea.objectsSpeed;
  newObstaclesArray.push(newCollectible);
}

const randomHeight = () => {
  let maxHeight =  200;
  let minHeight = 270;
  let heightRange = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
  return heightRange;
}

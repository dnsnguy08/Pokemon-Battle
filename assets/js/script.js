// Variables for player hands
const player1 = 1;
const player2 = 2;
const player1Hand = [];
const player2Hand = [];
const max = 151; // Game using only 151 original Pokemon
const activeCardTwo = document.getElementById("player2Card");
const activeCardOne = document.getElementById("player1Card");
var diceResult1; // player 1 dice roll result
var diceResult2; // player 2 dice roll result
var pickPokemon; // variable for random pokemon when dice index is undefined in player decks
var battleON = true; // Bool indicating battle round has been triggered
var playerOneTurn = false; // Bool variables to determine priority of player turns
var playerTwoTurn = false; //
var getPokemon; // get random pokemon is dice roll index is undefined for player hand
var startCounter = 0; // variable for showing start button at the beginning of the game

//Local storage for winners.
const storageInput = document.querySelector('.storage');
const text = document.querySelector('.text');
const button = document.querySelector('.button');
storageInput.addEventListener('input', letter => {
  text.textContent = letter.target.value
});
const saveToLocalStorage = () => {
  const textContent = text.textContent;
  const allWinners = JSON.parse(localStorage.getItem('allWinners'));
  if (allWinners === null) {
   localStorage.setItem('allWinners', JSON.stringify([textContent]));
  } else {
    allWinners.push(textContent)
    localStorage.setItem('allWinners',JSON.stringify(allWinners))
  }
  location.reload();
};
button.addEventListener('click',saveToLocalStorage);
const allWinners = JSON.parse(localStorage.getItem("allWinners"));
//list winner
if(allWinners === null) {
  console.log('waiting for winner')
}else window.onload = function (){
allWinners.forEach(winner => {
  let newListItem = document.createElement("li");
  newListItem.innerHTML=winner;
  document.querySelector("#past-winners").appendChild(newListItem);
})
}

var player1Winner = document.getElementById("player1Winner");
var player2Winner = document.getElementById("player2Winner");
var hideStatplayer1 = document.getElementById("hideStatplayer1");
var hideStatplayer2 = document.getElementById("hideStatplayer2");
// Function for randomizing player1 and player 2 decks to choose Pokemon from
function generateHands() {
  for (let i = 0; i < 6; i++) {
    var pickPokemon1 = Math.floor(Math.random() * max);
    player1Hand[i] = pickPokemon1;
    var pickPokemon2 = Math.floor(Math.random() * max);
    player2Hand[i] = pickPokemon2;
  }
  // Display pokemon images in player deck cards
  for (let i = 0; i < player1Hand.length; i++) {
    var api_url = `https://pokeapi.co/api/v2/pokemon/${player1Hand[i]}`;
    fetch(api_url, { // Fetch pokemon data
    })  
      .then(function(response){
      return response.json();
    })
      .then(function(data){ // apply pokemon image to player deck card
        var icon = data.sprites.other["official-artwork"].front_default;
        document.querySelector(`#pic1${i}`).src = icon;
      })
    }
  for (let i = 0; i < player2Hand.length; i++) {
    var api_url = `https://pokeapi.co/api/v2/pokemon/${player2Hand[i]}`;
    fetch(api_url, { // Fetch pokemon data
    })  
      .then(function(response){
      return response.json();
    })
      .then(function(data){ // apply pokemon image to player deck card
        var icon = data.sprites.other["official-artwork"].front_default;
        document.querySelector(`#pic2${i}`).src = icon;
      })
    }
}

// Dice Roll API Key
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
    'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
  }
};

// Roll Dice to pick a random pokemon from player hands and display on page
function getRandomPokemon(player) {
  fetch('https://roll-dice1.p.rapidapi.com/rollDice', options) // Player Dice roll
  
  .then(function(response){
    return response.json();
  })
  .then(function(data){ // store dice roll results based on player
    if (player === 1) {
      diceResult1 = data.data.Dice
    }
    if (player === 2) {
      diceResult2 = data.data.Dice
    }
    
    if (player === 1 && player1Hand[diceResult1-1] === undefined) {
      pickPokemon = Math.floor(Math.random() * player1Hand.length); // randomize pokemon summon if dice roll index does not apply
      getPokemon = player1Hand[pickPokemon];
      var api_url = `https://pokeapi.co/api/v2/pokemon/${getPokemon}`; // Create API call based on remaining pokemon in player hand
    } else if (player === 1) {
      var api_url = `https://pokeapi.co/api/v2/pokemon/${player1Hand[diceResult1-1]}`; // Create API call based on dice roll result
    }

    if (player === 2 && player2Hand[diceResult2-1] === undefined) {
      pickPokemon = Math.floor(Math.random() * player2Hand.length)
      getPokemon = player2Hand[pickPokemon];
      var api_url = `https://pokeapi.co/api/v2/pokemon/${getPokemon}`; // Create API call based on remaining pokemon in player hand
    } else if (player === 2) {
      var api_url = `https://pokeapi.co/api/v2/pokemon/${player2Hand[diceResult2-1]}`; // Create API call based on dice roll result
    }

    fetch(api_url, { // Fetch pokemon data based on dice roll
    })  
      .then(function(response){
      return response.json();
    })
      .then(function(data){ // apply pokemon stats and image to the page
        let pokeName = data.name;
        let pokeType = data.types[0].type.name;
        let hp = data.stats[0].base_stat;
        let attack = data.stats[1].base_stat;
        let icon = data.sprites.other["official-artwork"].front_default;
        document.getElementById(`name${player}`).textContent = pokeName;
        document.getElementById(`types${player}`).textContent = pokeType;
        document.getElementById(`hp${player}`).textContent = hp;
        document.getElementById(`attack${player}`).textContent = attack; 
        document.getElementById(`img${player}`).src = icon;
      })
    })
  }

// Function for removing fainted pokemon from player hands
function checkPlayerCards(hand, player) {
  if (player === 1) {
    if (hand[diceResult1-1] === undefined) {
      let index = hand.indexOf(getPokemon); // get the index of the pokemon number strin
      hand.splice(index, 1); // remove the pokemon's index from player hand
    } else {
      hand.splice((diceResult1-1),1);
    }
  }
    if (player === 2) {
      if (hand[diceResult2-1] === undefined) {
        let index = hand.indexOf(getPokemon); // get the index of the pokemon number string
        hand.splice(index, 1); // remove the pokemon's index from player hand
      } else {
        hand.splice((diceResult2-1),1);
      }
    }
}

// Event listener to generate decks
var generateDeckEl = document.querySelector("#generateDeck");

var removeButton = document.querySelector("#remove-button");
generateDeckEl.addEventListener("click",function(){
    generateHands();
    generateDeckEl.remove();
    selectPokemon1.style.display = 'block'; // show game buttons after generating deck
    selectPokemon2.style.display = 'block';
  }
);

// Player 1 roll dice and summon pokemon from deck
var selectPokemon1 = document.querySelector("#rollDice1");
var container = document.querySelector('.container');
selectPokemon1.addEventListener("click",function(){
  if (player1Hand.length !== 0) {
    playerOneTurn = true; // if player dice button is clicked set their next turn as priority
    selectPokemon1.style.display = 'none'; // hide dice roll button after clicking on it
    activeCardOne.style.backgroundColor = "yellow";

    getRandomPokemon(player1);
    $("#flip-card-1").addClass("flipContainer1"); // Flip card to reveal pokemon and stats
    if (startCounter != 2){ // initiate the startBattle button only when both roll dice buttons are clicked at the start 
      startCounter += 1;
    }
    if (startCounter === 2) {
      startBattle.style.display = 'block';
    }
  }
  if (player1Hand.length === 0){ // display winner when hand is out of cards
    container.style.display = 'block';
    player2Winner.style.display = "block";
    hideStatplayer2.style.display = "none";
    selectPokemon1.style.display = "none";
    }
  }
);

// Player 2 roll dice and summon pokemon from deck
var selectPokemon2 = document.querySelector("#rollDice2");
selectPokemon2.addEventListener("click",function(){
  if (player2Hand.length !== 0) {
    playerTwoTurn = true; // if player dice button is clicked set their next turn as priority
    selectPokemon2.style.display = 'none'; // hide dice roll button after clicking on it
    activeCardTwo.style.backgroundColor = "yellow";
    getRandomPokemon(player2);
    $("#flip-card-2").addClass("flipContainer2"); // Flip card to reveal pokemon and stats
    if (startCounter != 2){ // initiate the startBattle button only when both roll dice buttons are clicked at the start
      startCounter += 1;
    }
    if (startCounter === 2) {
      startBattle.style.display = 'block';
    }
  }
  if (player2Hand.length === 0){ // display winner when hand is out of cards
    container.style.display = 'block';
    player1Winner.style.display = "block";
    hideStatplayer1.style.display = "none";
    selectPokemon2.style.display = "none";
    }
  }
);

//Function to Start the Pokemon Battle
var startBattle = document.querySelector("#startBattle");
startBattle.addEventListener("click",function(){
  var hp1 = parseInt(document.getElementById("hp1").textContent);
  var hp2 = parseInt(document.getElementById("hp2").textContent);
  var attack1 = parseInt(document.getElementById("attack1").textContent);
  var attack2 = parseInt(document.getElementById("attack2").textContent);
  startBattle.style.display = 'none';

  while (player1Hand.length > 0 && player2Hand.length > 0){
    if (playerOneTurn === true) { // player 1 pokemon attacks first if true
      hp2 -= attack1;
      playerOneTurn = false; //reset player turn to false after an attack
      playerTwoTurn = true;
      var hp2Text = document.getElementById("hp2");
      hp2Text.textContent = hp2.toString();
      $('#player2Card').shake() // shake card when attacked
      if (hp2 <= 0){
        hp2Text.textContent = '0';
        activeCardTwo.style.backgroundColor = "red";
        checkPlayerCards(player2Hand, 2); // check player deck and remove fainted pokemon
        selectPokemon2.style.display = 'block';
        break;
      }
      hp1 -= attack2;
      playerTwoTurn = false; //reset player turn to false after an attack
      playerOneTurn = true;
      var hp1Text = document.getElementById("hp1");
      hp1Text.textContent = hp1.toString();
      $('#player1Card').shake() // shake card when attacked
      if (hp1 <= 0){
        hp1Text.textContent = '0';
        activeCardOne.style.backgroundColor = "red";
        checkPlayerCards(player1Hand, 1); // check player deck and remove fainted pokemon
        selectPokemon1.style.display = 'block';
        break;
      }
    }

    if (playerTwoTurn === true) { // player 2 pokemon attacks first if true
      hp1 -= attack2;
      playerTwoTurn = false; //reset player turn to false after an attack
      playerOneTurn = true;
      var hp1Text = document.getElementById("hp1");
      hp1Text.textContent = hp1.toString();
      $('#player1Card').shake() // shake card when attacked
      if (hp1 <= 0){
        hp1Text.textContent = '0';
        activeCardOne.style.backgroundColor = "red";
        checkPlayerCards(player1Hand, 1); // check player deck and remove fainted pokemon
        selectPokemon1.style.display = 'block';
        break;
    }
      hp2 -= attack1;
      playerOneTurn = false; //reset player turn to false after an attack
      playerTwoTurn = true;
      var hp2Text = document.getElementById("hp2");
      hp2Text.textContent = hp2.toString();
      $('#player2Card').shake() // shake card when attacked
      if (hp2 <= 0){
        hp2Text.textContent = '0';
        activeCardTwo.style.backgroundColor = "red";
        checkPlayerCards(player2Hand, 2); // check player deck and remove fainted pokemon
        selectPokemon2.style.display = 'block';
        break;
      }
    }
  startBattle.style.display = 'block';
  break;
  }
});

// Variables for player hands
const playerOne = 1;
const playerTwo = 2;
const playerOneHand = [];
const playerTwoHand = [];
const max = 151; // Game using only 151 original Pokemon
var activeCardTwo = document.getElementById("player2Card");
var activeCardOne = document.getElementById("playerOneCard");
var diceResult;
var pickPokemon; // variable for random pokemon when dice index is undefined in player decks

// Function for randomzing playerOne and player 2 decks to choose Pokemon from
function generateHands() {
  for (let i = 0; i < 6; i++) {
    var pickPokemon1 = Math.floor(Math.random() * max);
    playerOneHand[i] = pickPokemon1;
    var pickPokemon2 = Math.floor(Math.random() * max);
    playerTwoHand[i] = pickPokemon2;
  }
  console.log(playerOneHand);
  console.log(playerTwoHand);
  // Display pokemon images in player deck cards
  for (let i = 0; i < playerOneHand.length; i++) {
    var api_url = `https://pokeapi.co/api/v2/pokemon/${playerOneHand[i]}`;
    fetch(api_url, { // Fetch pokemon data
    })  
      .then(function(response){
      return response.json();
    })
      .then(function(data){ // apply pokemon image to player deck card
        let icon = data.sprites.other["official-artwork"].front_default;
        document.querySelector(`#pic1${i}`).src = icon;
      })
    }
  for (let i = 0; i < playerTwoHand.length; i++) {
    var api_url = `https://pokeapi.co/api/v2/pokemon/${playerTwoHand[i]}`;
    fetch(api_url, { // Fetch pokemon data
    })  
      .then(function(response){
      return response.json();
    })
      .then(function(data){ // apply pokemon image to player deck card
        let icon = data.sprites.other["official-artwork"].front_default;
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
  .then(function(data){
    diceResult = data.data.Dice
    console.log(`dice roll: ${diceResult}`);
    console.log(`hand index: ${diceResult -1}`);
    
    if (player === 1 && playerOneHand[diceResult-1] === undefined) {
      pickPokemon = Math.floor(Math.random() * playerOneHand.length); // randomize pokemon summon if dice roll index does not apply
      let getPokemon = playerOneHand[pickPokemon];
      console.log(getPokemon);
      var api_url = `https://pokeapi.co/api/v2/pokemon/${getPokemon}`; // Create API call based on remaining pokemon in player hand
    } else if (player === 1) {
      var api_url = `https://pokeapi.co/api/v2/pokemon/${playerOneHand[diceResult-1]}`; // Create API call based on dice roll result
    }

    if (player === 2 && playerTwoHand[diceResult-1] === undefined) {
      pickPokemon = Math.floor(Math.random() * playerTwoHand.length)
      let getPokemon = playerTwoHand[pickPokemon];
      console.log(getPokemon);
      var api_url = `https://pokeapi.co/api/v2/pokemon/${getPokemon}`; // Create API call based on remaining pokemon in player hand
    } else if (player === 2) {
      var api_url = `https://pokeapi.co/api/v2/pokemon/${playerTwoHand[diceResult-1]}`; // Create API call based on dice roll result
    }

    fetch(api_url, { // Fetch pokemon data based on dice roll
    })  
      .then(function(response){
      return response.json();
    })
      .then(function(data){ // apply pokemon stats an image to the page
        let pokeName = data.name;
        let pokeType = data.types[0].type.name;
        let hitPoints = data.stats[0].base_stat;
        let attack = data.stats[1].base_stat;
        let icon = data.sprites.other["official-artwork"].front_default;
        document.getElementById(`name${player}`).textContent = pokeName;
        document.getElementById(`types${player}`).textContent = pokeType;
        document.getElementById(`hitPoints${player}`).textContent = hitPoints;
        document.getElementById(`attack${player}`).textContent = attack; 
        document.getElementById(`img${player}`).src = icon;
      })
    })
  }

// Function for removing fainted pokemon from player hands
function checkPlayerCards(hand) {
    if (hand[diceResult-1] === undefined) {
      hand.splice(pickPokemon)
    } else {
      hand.splice((diceResult-1),1);
    }
}

// Event listener to generate decks
var generateDeckEl = document.querySelector("#generateDeck");
generateDeckEl.addEventListener("click",function(){
    generateHands();
    //hide the deck button;
    console.log(generateDeckEl);
    generateDeckEl.remove();
  }
);

// Player 1 roll dice and summon pokemon from deck
var selectPokemonOne = document.querySelector("#rollDiceOne");
selectPokemonOne.addEventListener("click",function(){
  activeCardOne.style.backgroundColor = "yellow";
  getRandomPokemon(playerOne);
  console.log(selectPokemonOne);
  }
);

// Player 2 roll dice and summon pokemon from deck
var selectPokemonTwo = document.querySelector("#rollDiceTwo");
selectPokemonTwo.addEventListener("click",function(){
  activeCardTwo.style.backgroundColor = "yellow";
  getRandomPokemon(playerTwo);
  console.log(selectPokemonTwo);
  }
);

//Function to Start the Pokemon Battle
var startBattle = document.querySelector("#startBattle");
startBattle.addEventListener("click",function(){
var hitPoints1 = parseInt(document.getElementById("hitPoints1").textContent);
var hitPoints2 = parseInt(document.getElementById("hitPoints2").textContent);
var attack1 = parseInt(document.getElementById("attack1").textContent);
var attack2 = parseInt(document.getElementById("attack2").textContent);
  
  while (hitPoints1 > 0 || hitPoints2 > 0)
  {
    
    hitPoints2 -= attack1;
    var hitPoints2Text = document.getElementById("hitPoints2");
    hitPoints2Text.textContent = hitPoints2.toString();
    $('#player2Card').shake()
    // delay
    if (hitPoints2 <= 0){
      hitPoints2Text.textContent = '0';
      //code for pokemon faint
      activeCardTwo.style.backgroundColor = "red";
      checkPlayerCards(player2Hand); // check player deck and remove fainted pokemon
      console.log(player2Hand);
      break;
    }

    hitPoints1 -= attack2;
    var hitPoints1Text = document.getElementById("hitPoints1");
    hitPoints1Text.textContent = hitPoints1.toString();
    $('#playerOneCard').shake()
    //delay    
    if (hitPoints1 <= 0){
      hitPoints1Text.textContent = '0';
      activeCardOne.style.backgroundColor = "red";
      checkPlayerCards(playerOneHand); // check player deck and remove fainted pokemon
      console.log(playerOneHand);
      break;
    }
  }
});
// To do list
// delay(wip)
// ✔hide the button get your decks
//Adding logic for attack priority
// ✔ Clean up variable names (some can't be changed due to logic.)

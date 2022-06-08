// Variables for player hands
const player1 = 1;
const player2 = 2;
const player1Hand = [];
const player2Hand =[];
const max = 151; // Game using only 151 original Pokemon
var bgcolorPlayerCard2 = document.getElementById("player2Card");
var bgcolorPlayerCard1 = document.getElementById("player1Card");
var diceResult;

// Function for randomzing player1 and player 2 decks to choose Pokemon from
function generateHands() {
  for (let i = 0; i < 6; i++) {
    var pickPokemon1 = Math.floor(Math.random() * max);
    player1Hand[i] = pickPokemon1;
    var pickPokemon2 = Math.floor(Math.random() * max);
    player2Hand[i] = pickPokemon2;
  }
  console.log(player1Hand);
  console.log(player2Hand);
  // Display pokemon images in player deck cards
  for (let i = 0; i < player1Hand.length; i++) {
    var api_url = `https://pokeapi.co/api/v2/pokemon/${player1Hand[i]}`;
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
  for (let i = 0; i < player2Hand.length; i++) {
    var api_url = `https://pokeapi.co/api/v2/pokemon/${player2Hand[i]}`;
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
    let result = data.data.Dice
    diceResult = data.data.Dice
    console.log(result);
    if (player === 1) {
      var api_url = `https://pokeapi.co/api/v2/pokemon/${player1Hand[result-1]}`; // Create API call based on dice roll result
    } else {
      var api_url = `https://pokeapi.co/api/v2/pokemon/${player2Hand[result-1]}`; // Create API call based on dice roll result
    }
    fetch(api_url, { // Fetch pokemon data based on dice roll
    })  
      .then(function(response){
      return response.json();
    })
      .then(function(data){ // apply pokemon stats an image to the page
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

// Event listener to generate decks
var generateDeckEl = document.querySelector("#generateDeck");
generateDeckEl.addEventListener("click",function(){
    generateHands();
    //hide the deck button;
    console.log(generateDeckEl);
  }
);

// Player 1 roll dice and summon pokemon from deck
var selectPokemon1 = document.querySelector("#rollDice1");
selectPokemon1.addEventListener("click",function(){
  bgcolorPlayerCard1.style.backgroundColor = "yellow";
  getRandomPokemon(player1);
  console.log(selectPokemon1);
  }
);

// Player 2 roll dice and summon pokemon from deck
var selectPokemon2 = document.querySelector("#rollDice2");
selectPokemon2.addEventListener("click",function(){
  bgcolorPlayerCard2.style.backgroundColor = "yellow";
  getRandomPokemon(player2);
  console.log(selectPokemon1);
  }
);

//Function to Start the Pokemon Battle
var startBattle = document.querySelector("#startBattle");
startBattle.addEventListener("click",function(){
var hp1 = parseInt(document.getElementById("hp1").textContent);
var hp2 = parseInt(document.getElementById("hp2").textContent);
var attack1 = parseInt(document.getElementById("attack1").textContent);
var attack2 = parseInt(document.getElementById("attack2").textContent);
  
  while (hp1 > 0 || hp2 > 0)
  {
    
    hp2 -= attack1;
    var hp2Text = document.getElementById("hp2");
    hp2Text.textContent = hp2.toString();
    // delay
    if (hp2 <= 0){
      hp2Text.textContent = '0';
      //code for pokemon faint
      bgcolorPlayerCard2.style.backgroundColor = "red";
      player2Hand.splice((diceResult - 1),1);
      console.log(player2Hand);
      break;

    }
    bgcolorPlayerCard1.style.backgroundColor = "yellow";
    hp1 -= attack2;
    var hp1Text = document.getElementById("hp1");
    hp1Text.textContent = hp1.toString();
    //delay    
    if (hp1 <= 0){
      hp1Text.textContent = '0';
      bgcolorPlayerCard1.style.backgroundColor = "red";
      player1Hand.splice((diceResult - 1),1);
      console.log(player1Hand);
      break;
    }
    console.log(hp2Text);
    console.log(hp1Text);

  } 
  
});
// To do list
//delay
//hide the button get your decks
//Adding logic for attack priority
//Clean up variable names

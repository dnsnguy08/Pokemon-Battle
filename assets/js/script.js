// Variables for player hands
const player1 = 1;
const player2 = 2;
const player1Hand = [];
const player2Hand =[];
const max = 151; // Game using only 151 original Pokemon

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
        let defense = data.stats[2].base_stat;
        let icon = data.sprites.other["official-artwork"].front_default;
        document.getElementById(`name${player}`).textContent = pokeName;
        document.getElementById(`types${player}`).textContent = pokeType;
        document.getElementById(`hp${player}`).textContent = hp;
        document.getElementById(`attack${player}`).textContent = attack;
        document.getElementById(`defense${player}`).textContent = defense;
        document.getElementById(`img${player}`).src = icon;
        document.getElementById(`chose-pokemon${player}`).textContent = pokeName;
      })
    })
  }

//adding the event listener to generate deck battle
//implement button on the top randomize button
var generateDeckEl = document.getElementById("load-deck");
generateDeckEl.addEventListener("click",function(){
    generateHands();
}
);


var selectPokemon1 = document.getElementById("roll-dice-1");
selectPokemon1.addEventListener("click",function(){
  getRandomPokemon(player1);
}
);

var selectPokemon2 = document.getElementById("roll-dice-2");
selectPokemon2.addEventListener("click",function(){
  getRandomPokemon(player2);
}
);

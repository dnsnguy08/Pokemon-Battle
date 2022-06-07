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
        let icon = data.sprites.other["official-artwork"].front_default;
        document.getElementById(`name${player}`).textContent = pokeName;
        document.getElementById(`types${player}`).textContent = pokeType;
        document.getElementById(`hp${player}`).textContent = hp;
        document.getElementById(`attack${player}`).textContent = attack; 
        document.getElementById(`img${player}`).src = icon;
      })
    })
  }

//adding the event listener to generate deck battle
//implement button on the top randomize button
window.onload=function(){
var generateDeckEl = document.querySelector("#generateDeck");
generateDeckEl.addEventListener("click",function(){
    generateHands();
    console.log(generateDeckEl);
}
);
let gameButtons = document.querySelector("#gameButtons");
var selectPokemon1 = gameButtons.querySelector("#roll-dice-1");
selectPokemon1.addEventListener("click",function(){
  getRandomPokemon(player1);
  console.log(selectPokemon1);
}
);

var selectPokemon2 = gameButtons.querySelector("#roll-dice-2");
selectPokemon2.addEventListener("click",function(){
  getRandomPokemon(player2);
  console.log(selectPokemon1);
}
);
};
// function to start the battle
// poke1Attack = attack
// poke2Health = hp + defense
// poke2Attack = attack
// start battle >>add event listener on click start button
// var startButton = document.getElementById("start-battle");
// var hp1 = document.getElementById('hp1').textContent;
// var startButton = document.getElementById("start-battle");
// startButton.addEventListener("click",function(){
//   console.log(hp1);
// });


// var startButton = document.querySelector("#start-battle button");
// startButton.addEventListener("click",function(){
  // function startBattle(){
//     while (parseInt(document.getElementById("hp1").textContent) > 0 || parseInt(document.getElementById("hp2").textContent) > 0)
//     {
//       console.log(document.getElementById("hp1").textContent);
//     } 
//   }
// );

//        parseInt(document.getElementById("hp2").textContent) -= parseInt(document.getElementById("attack1").textContent);

//     }
//   }
// );


// Arrays for player hands
const player1Hand = [];
const player2Hand =[];
const max = 151; // Game using only 151 original Pokemon

// Function for randomzing player1 and player 2 decks to choose Pokemon from
function generateHand() {
<<<<<<< Updated upstream
  for (let i = 0; i < 6; i++) {
=======
  for (let i = 0; i < 7; i++) {
>>>>>>> Stashed changes
    var pickPokemon1 = Math.floor(Math.random() * max);
    player1Hand[i] = pickPokemon1;
    var pickPokemon2 = Math.floor(Math.random() * max);
    player2Hand[i] = pickPokemon2;
  }
}

generateHand();

// Dice Roll API Key
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
    'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
  }
};

// Roll Dice to pick a random pokemon from player hands and display on page
function getRandomPokemon() {
  fetch('https://roll-dice1.p.rapidapi.com/rollDice', options) // Player 1 Dice roll
  
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    let result1 = data.data.Dice
<<<<<<< Updated upstream
    var api_url = `https://pokeapi.co/api/v2/pokemon/${player1Hand[result1-1]}`; // Create API call based on dice roll result
=======
    var api_url = `https://pokeapi.co/api/v2/pokemon/${player1Hand[result1]}`; // Create API call based on dice roll result
>>>>>>> Stashed changes
    
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
        document.getElementById("name1").textContent = pokeName;
        document.getElementById("types1").textContent = pokeType;
        document.getElementById("hp1").textContent = hp;
        document.getElementById("attack1").textContent = attack;
        document.getElementById("defense1").textContent = defense;
        document.getElementById("img1").src = icon;
      })

      // Player 2 dice roll
      fetch('https://roll-dice1.p.rapidapi.com/rollDice', options)
  
      .then(function(response){
        return response.json();
      })
      .then(function(data) {
        let result2 = data.data.Dice
<<<<<<< Updated upstream
        var api_url2 = `https://pokeapi.co/api/v2/pokemon/${player2Hand[result2-1]}`; // Create API call based on dice roll result
=======
        var api_url2 = `https://pokeapi.co/api/v2/pokemon/${player2Hand[result2]}`; // Create API call based on dice roll result
>>>>>>> Stashed changes
        
        fetch(api_url2, { // Fetch pokemon data based on dice roll
        })  
          .then(function(response){
          return response.json();
        })
          .then(function (data) { // apply pokemon stats an image to the page
            let pokeName = data.name;
            let pokeType = data.types[0].type.name;
            let hp = data.stats[0].base_stat;
            let attack = data.stats[1].base_stat;
            let defense = data.stats[2].base_stat;
            let icon = data.sprites.other["official-artwork"].front_default;
            document.getElementById("name2").textContent = pokeName;
            document.getElementById("types2").textContent = pokeType;
            document.getElementById("hp2").textContent = hp;
            document.getElementById("attack2").textContent = attack;
            document.getElementById("defense2").textContent = defense;
            document.getElementById("img2").src = icon;
          })
        })
      })
  }

getRandomPokemon();

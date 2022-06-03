// Arrays for player hands
const player1Hand = [];
const player2Hand =[];
const max = 151; // Game using only 151 original Pokemon

// Function for randomzing player1 and player 2 decks to choose Pokemon from
function generateHand() {
  for (let i = 0; i < 7; i++) {
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
    var api_url = `https://pokeapi.co/api/v2/pokemon/${player1Hand[result1]}`; // Create API call based on dice roll result
    
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
        var api_url2 = `https://pokeapi.co/api/v2/pokemon/${player2Hand[result2]}`; // Create API call based on dice roll result
        
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





















//   fetch(api_url, {
//   })  
//     .then(function(response){
//     return response.json();
//   })
//     .then(function (data) { // grab the weather data from the API call
//       let pokeName = data.name;
//       let pokeType = data.types[0].type.name;
//       let hp = data.stats[0].base_stat;
//       let attack = data.stats[1].base_stat;
//       let defense = data.stats[2].base_stat;
//       let icon = data.sprites.other["official-artwork"].front_default;
//       document.getElementById("name1").textContent = pokeName;
//       document.getElementById("types1").textContent = pokeType;
//       document.getElementById("hp1").textContent = hp;
//       document.getElementById("attack1").textContent = attack;
//       document.getElementById("defense1").textContent = defense;
//       document.getElementById("img1").src = icon;
//     })
//     var api_url2 = `https://pokeapi.co/api/v2/pokemon/${diceResults2}`;
//     fetch(api_url2, {
//     })  
//       .then(function(response){
//       return response.json();
//     })
//       .then(function (data) { // grab the weather data from the API call
//         let pokeName = data.name;
//         let pokeType = data.types[0].type.name;
//         let hp = data.stats[0].base_stat;
//         let attack = data.stats[1].base_stat;
//         let defense = data.stats[2].base_stat;
//         let icon = data.sprites.other["official-artwork"].front_default;
//         document.getElementById("name2").textContent = pokeName;
//         document.getElementById("types2").textContent = pokeType;
//         document.getElementById("hp2").textContent = hp;
//         document.getElementById("attack2").textContent = attack;
//         document.getElementById("defense2").textContent = defense;
//         document.getElementById("img2").src = icon;
//       })

// }

// getRandomPokemon();

// // implement the dice ranomzization
// // function diceRoll() {
// //   const options = {
// //     method: 'GET',
// //     headers: {
// //       'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
// //       'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
// //     }
// //   };
  
// //   fetch('https://roll-dice1.p.rapidapi.com/rollDice', options)
// //     .then(function(response){
// //       return response.json();
// //     })
// //     .then(function(data) {
// //       let result = data.data.Dice
// //       return result
// //     })
// // }

// // diceRoll();






// // function to get information about picked pokemon
// // async function getRandomPokemon() {
// //   const response = await fetch(api_url);
// //   const data = await response.json();
// //   // Name of the pokemon
// //   var { name } = data;
// //   //Element of the pokemon
// //   var { types, [0]: type, name } = data;
// //   //Hp of the pokemon
// //   var { stats, [0]: base_stat } = data;
// //   //Attack of the pokemon
// //   var { stats, [1]: base_stat } = data;
// //   //Defense of the pokemon
// //   var { stats, [2]: base_stat } = data;
// //   //Pull the offical artwork of the pokemon
// //   imageUrl = { sprites, other, ["official-artwork"]: front_default } = data;
// //   // proof of the pokemon stats and img
// //   document.getElementById("name").textContent = name;
// //   document.getElementById("types").textContent = types[0].type.name;
// //   document.getElementById("hp").textContent = stats[0].base_stat;
// //   document.getElementById("attack").textContent = stats[1].base_stat;
// //   document.getElementById("defense").textContent = stats[2].base_stat;
// //   // json image source
// //   img.src = sprites.other["official-artwork"].front_default;

// //   console.log(data);
// //   console.log(img);
// // }
// // getRandomPokemon();

// //API for Dice//
// // const options = {
// // 	method: 'GET',
// // 	headers: {
// // 		'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
// // 		'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
// // 	}
// // };

// // fetch('https://roll-dice1.p.rapidapi.com/rollDice', options)
// // 	.then(response => response.json())
// // 	.then(response => console.log(response))
// // 	.catch(err => console.error(err));

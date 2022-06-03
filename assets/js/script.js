// // simple random number generator to pick a pokemon
// var min = -1;
// var max = 151;
// var diceResults1 = Math.floor(Math.random() * (max - min)) + min;
// // console.log(diceResults);

// var diceResults2 = Math.floor(Math.random() * (max - min)) + min;

// api url
// var api_url = `https://pokeapi.co/api/v2/pokemon/${diceResults1}`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
    'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
  }
};
// fetch(api_url)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
//   .catch(err => console.error(err));
  
function getRandomPokemon() {
  // var api_url1 = `https://pokeapi.co/api/v2/pokemon/${diceResults}`;
  fetch('https://roll-dice1.p.rapidapi.com/rollDice', options)
  
  .then(function(response){
    return response.json();
  })

  .then(function(data) {
    let result1 = data.data.Dice
    // return result
    
    var api_url = `https://pokeapi.co/api/v2/pokemon/${result1}`;
    fetch(api_url, {
    })  
      .then(function(response){
      return response.json();
    })
      .then(function (data) { // grab the weather data from the API call
        let pokeName = data.name;
        let pokeType = data.types[0].type.name;
        let hp = data.stats[0].base_stat;
        let attack = data.stats[1].base_stat;
        let defense = data.stats[2].base_stat;
        let icon = data.sprites.other["official-artwork"].front_default;
        document.getElementById("name").textContent = pokeName;
        document.getElementById("types").textContent = pokeType;
        document.getElementById("hp").textContent = hp;
        document.getElementById("attack").textContent = attack;
        document.getElementById("defense").textContent = defense;
        document.getElementById("img").src = icon;
      })

      fetch('https://roll-dice1.p.rapidapi.com/rollDice', options)
  
      .then(function(response){
        return response.json();
      })
    
      .then(function(data) {
        let result2 = data.data.Dice
        var api_url2 = `https://pokeapi.co/api/v2/pokemon/${result2}`;
        fetch(api_url2, {
        })  
          .then(function(response){
          return response.json();
        })
          .then(function (data) { // grab the weather data from the API call
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
  }
)}

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
//       document.getElementById("name").textContent = pokeName;
//       document.getElementById("types").textContent = pokeType;
//       document.getElementById("hp").textContent = hp;
//       document.getElementById("attack").textContent = attack;
//       document.getElementById("defense").textContent = defense;
//       document.getElementById("img").src = icon;
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

getRandomPokemon();

// implement the dice ranomzization
// function diceRoll() {
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
//       'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
//     }
//   };
  
//   fetch('https://roll-dice1.p.rapidapi.com/rollDice', options)
//     .then(function(response){
//       return response.json();
//     })
//     .then(function(data) {
//       let result = data.data.Dice
//       return result
//     })
// }

// diceRoll();






// function to get information about picked pokemon
// async function getRandomPokemon() {
//   const response = await fetch(api_url);
//   const data = await response.json();
//   // Name of the pokemon
//   var { name } = data;
//   //Element of the pokemon
//   var { types, [0]: type, name } = data;
//   //Hp of the pokemon
//   var { stats, [0]: base_stat } = data;
//   //Attack of the pokemon
//   var { stats, [1]: base_stat } = data;
//   //Defense of the pokemon
//   var { stats, [2]: base_stat } = data;
//   //Pull the offical artwork of the pokemon
//   imageUrl = { sprites, other, ["official-artwork"]: front_default } = data;
//   // proof of the pokemon stats and img
//   document.getElementById("name").textContent = name;
//   document.getElementById("types").textContent = types[0].type.name;
//   document.getElementById("hp").textContent = stats[0].base_stat;
//   document.getElementById("attack").textContent = stats[1].base_stat;
//   document.getElementById("defense").textContent = stats[2].base_stat;
//   // json image source
//   img.src = sprites.other["official-artwork"].front_default;

//   console.log(data);
//   console.log(img);
// }
// getRandomPokemon();

//API for Dice//
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
// 		'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
// 	}
// };

// fetch('https://roll-dice1.p.rapidapi.com/rollDice', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
// simple random number generator to pick a pokemon
var min = -1;
var max = 151;
var diceResults = Math.floor(Math.random() * (max - min)) + min;
console.log(diceResults);
// api url
var api_url = `https://pokeapi.co/api/v2/pokemon/${diceResults}`;
// function to get information about picked pokemon
async function getRandomPokemon() {
  const response = await fetch(api_url);
  const data = await response.json();
  // Name of the pokemon
  var { name } = data;
  //Element of the pokemon
  var { types, [0]: type, name } = data;
  //Hp of the pokemon
  var { stats, [0]: base_stat } = data;
  //Attack of the pokemon
  var { stats, [1]: base_stat } = data;
  //Defense of the pokemon
  var { stats, [2]: base_stat } = data;
  //Pull the offical artwork of the pokemon
  imageUrl = { sprites, other, ["official-artwork"]: front_default } = data;
  // proof of the pokemon stats and img
  document.getElementById("name").textContent = name;
  document.getElementById("types").textContent = types[0].type.name;
  document.getElementById("hp").textContent = stats[0].base_stat;
  document.getElementById("attack").textContent = stats[1].base_stat;
  document.getElementById("defense").textContent = stats[2].base_stat;
  // json image source
  img.src = sprites.other["official-artwork"].front_default;

  console.log(data);
  console.log(img);
}
getRandomPokemon();

//API for Dice//
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
		'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
	}
};

fetch('https://roll-dice1.p.rapidapi.com/rollDice', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
// simple random number generator to pick a pokemon
var min =-1;
var max =152;
var diceResults = Math.floor(Math.random() * (max - min)) + min;
console.log (diceResults);
// api url
var api_url = (`https://pokeapi.co/api/v2/pokemon/${diceResults}`);
// function to get information about picked pokemon
async function getRandomPokemon(){
    const response = await fetch (api_url);
    const data = await response.json();
    const { name } = data;
    const { stats } = data;
    var { types,[0]:type} = data;
    console.log (data);
    document.getElementById('name').textContent = name;
    document.getElementById('types').textContent = types;
    document.getElementById('stats').textContent = stats;
    
}
getRandomPokemon();

// still need to pull stats(hp, damage, defence), type(pokemon element) and, stock png images
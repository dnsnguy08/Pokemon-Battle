// simple random number generator to pick a pokemon
var min =-1;
var max =7;
var diceResults = Math.floor(Math.random() * (max - min)) + min;
console.log (diceResults);
// api url
var api_url = (`https://pokeapi.co/api/v2/pokemon/${diceResults}`);
// function to get information about picked pokemon
async function getRandomPokemon(){
    const response = await fetch (api_url);
    const data = await response.json();
    // Name of the pokemon
    var { name } = data;
    //Element of the pokemon
    var {types,[0]:type,name} = data;
    //Hp of the pokemon
    var {stats,[0]:base_stat} = data;
    //Attack of the pokemon
    var {stats,[1]:base_stat} = data;
    //Defense of the pokemon
    var {stats,[2]:base_stat} = data;
    //Pull the offical artwork of the pokemon
    imageUrl = {sprites,other,["official-artwork"]:front_default} = data;
// proof of the pokemon stats and img
    document.getElementById('name').textContent = name;
    document.getElementById('types').textContent = types[0].type.name;
    document.getElementById('hp').textContent = stats[0].base_stat;
    document.getElementById('attack').textContent = stats[1].base_stat;
    document.getElementById('defense').textContent = stats[2].base_stat;
// json image source
    img.src = sprites.other["official-artwork"].front_default;

    console.log (data);
    console.log (img);
    
};
getRandomPokemon();


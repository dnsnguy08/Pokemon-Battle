// Function for randomzing player1 and player 2 decks to choose Pokemon from
function generateHand() {
  const max = 151; // Game using only 151 original Pokemon
  let playerHand = [];
  for (let i = 0; i < 6; i++) {
    var pokemonId = Math.floor(Math.random() * max);
    playerHand[i] = pokemonId;
  }
  return playerHand;
}

// Roll Dice to pick a random pokemon from player hands and display on page
const getRandomNumber = async () => {
  // Dice Roll API Key
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'roll-dice1.p.rapidapi.com',
      'X-RapidAPI-Key': 'a3a4e80f16msh76859c9ae8fbee0p1baf97jsn009677e9d3e0'
    }
  };
  const result = fetch('https://roll-dice1.p.rapidapi.com/rollDice', options) // Player 1 Dice roll
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    return data.data.Dice;
  })
  return result;
}

const getRandomPokemon = async (playerHand) => {
  const randomNumber = await getRandomNumber();
  const api_url = `https://pokeapi.co/api/v2/pokemon/${playerHand[randomNumber]}`; // Create API call based on dice roll result
  const result = fetch(api_url, { // Fetch pokemon data based on dice roll
  })  
    .then(function(response) {
      return response.json();
  })
    .then(function(data){ // apply pokemon stats an image to the page
      return data;
    })
  return result
} 

const setPlayerPokemon = (player, pokemon) => {
  let pokeName = pokemon.name;
  let pokeType = pokemon.types[0].type.name;
  let hp = pokemon.stats[0].base_stat;
  let attack = pokemon.stats[1].base_stat;
  let defense = pokemon.stats[2].base_stat;
  let icon = pokemon.sprites.other["official-artwork"].front_default;
  document.getElementById(`name${player}`).textContent = pokeName;
  document.getElementById(`types${player}`).textContent = pokeType;
  document.getElementById(`hp${player}`).textContent = hp;
  document.getElementById(`attack${player}`).textContent = attack;
  document.getElementById(`defense${player}`).textContent = defense;
  document.getElementById(`img${player}`).src = icon;
}

const main = async () => {
  // Variables for player hands
  const players = {
    one: {
      id: 1,
      hand: generateHand(),
      pokemon: undefined,
    },
    two: {
      id: 2,
      hand: generateHand(),
      pokemon: undefined,
    },
  }
  const battleState = {
    
  }
  players.one.pokemon = await getRandomPokemon(players.one.hand);
  players.two.pokemon =  await getRandomPokemon(players.two.hand);
  console.log(players.one.pokemon, players.two.pokemon);
  setPlayerPokemon(players.one.id, players.one.pokemon);
  setPlayerPokemon(players.two.id, players.two.pokemon);
};
main();
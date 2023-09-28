const pokeContent = document.getElementById("pokemonContent");
const modalSearch = document.getElementById("pokemonContent");
let pokeForm = document.getElementById("searchPokemon");

const drawPokemon = async () => {
  for (let i = 1; i <= 151; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id, modal) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const pokemon = await response.json();
  createPokemon(pokemon, modal);
};

function createPokemon(pokemon, modal) {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const poke_types = pokemon.types.map((type) => type.type);
  const type1 =
    pokemon.types[0].type.name[0].toUpperCase() +
    pokemon.types[0].type.name.slice(1);

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const imgPoke = pokemon.sprites.front_shiny;

  if (modal !== true) {
    const pokeInnerHTML = `
  <div class="img-container">
    <img src=${imgPoke} alt=${name}/>
  </div>
  <div class="info">
    <span class="number">#${pokemon.id.toString()}</span>
    <h3 class="name">${name}</h3>
    <h5 class="type">Type: <span>${type1}</span></h5>
  </div>
  `;

    pokemonEl.innerHTML = pokeInnerHTML;
    pokeContent.appendChild(pokemonEl);
    
  } else {
    const pokeInnerHTML = `
    <div class="modal" id="modalPokemon">
    <div class="pokemon">
    <div class="img-container">
        <img src="${imgPoke}" alt="${name}" />
    </div>
    <div class="info">
        <span class="number">#${pokemon.id.toString()}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Tipo: <span>${type1}</span></small>
    </div>
    </div>

</div>`;

    modalSearch.innerHTML = pokeInnerHTML;
  }
}

drawPokemon();

pokeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchPokemon = document.getElementById("pokemon").value;
  // pokeContent.innerHTML = ''; // Limpiar el contenido actual
  getPokemon(searchPokemon, true);
});

const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151

const limit = 12
let offset = 0

function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToHtml(pokemon) {
    return `
    <li class="pokemon">
        <div class="flip-container">
            <div class="flipper">
                <div class="front ${pokemon.type}">
                    <div class="headfront">
                        <span class="name">${pokemon.name.toUpperCase()} | </span>
                        <span class="number">${pokemon.number}</span>
                    </div>
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                </div>
                <div class="back">
                    <div class="pokedesc">
                        <div class="nomeverso">
                            <img class="smallimg" src="${pokemon.smallphoto}">
                            <span class="name">${pokemon.name.toUpperCase()}</span>
                        </div>
                        <span class="number">${pokemon.number}</span>
                    </div>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type} ${pokemon.type}">${type}</li>`).join('')}
                            <li class="type pokedata">Height: ${pokemon.height}</li>
                            <li class="type pokedata">Weight: ${pokemon.weight}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
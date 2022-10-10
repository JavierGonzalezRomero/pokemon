let init = async () => {
    const allPokemon = await getAllPokemon() 
    

    let pokemonDefinitiva = []


    for (let element in allPokemon) {
        const url = allPokemon[element].url;
        const pokemonData = await getPokemonData(url);
        pokemonDefinitiva.push(pokemonData)
   }
    const mappedPokemon = mapPokemon(pokemonDefinitiva) 
    drawPokemon(mappedPokemon) 
    let buttons$$ =document.querySelector("button");
    let input$$ = document.querySelector("input");
    buttons$$.addEventListener("click",() => searchPokemons(input$$.value,mappedPokemon))
}

const mapPokemon = (pokemonData) => {
            const mappedPokemon = pokemonData.map((pokemon) => ({
                name: pokemon.name,
                tipo1: pokemon.types[0].type.name,
                tipo2:pokemon.types[1]?.type.name,
                img:pokemon.sprites.front_default,
                id:pokemon.id
             }))
            return mappedPokemon;
        }
       

const getAllPokemon = async ()=> {

    const allPokemonResponse = await fetch ('https://pokeapi.co/api/v2/pokemon/?limit=151')
    const allPokemonJson = await allPokemonResponse.json();
    debugger
    return allPokemonJson.results;
}

const getPokemonData  = async (url) =>{ 
   const pokemonData = await fetch(url)
   const pokemonDataJson = await pokemonData.json()  
   return pokemonDataJson;       
}

const drawPokemon = (pokemons) => {
    let galeria$$ = document.querySelector(".container");
    galeria$$.innerHTML = "";   
    
   for(const pokemon of pokemons){
        const tipo2 = pokemon.tipo2 ? `/${pokemon.tipo2}`:""
        let carta = document.createElement ("div")
        carta.innerHTML =`<div class="carta_nombreImg">
        <div class="centrado" id="aquiNombre">
          ${pokemon.name}  
        </div>
        <div>
            <img  class="fotopokemon ${pokemon.tipo1}" src="${pokemon.img}" alt="">
        </div>
    </div>
    <div >
        <ol class="idTipo" id="pokedex">
            <li id = "aquiId"> id: ${pokemon.id} </li>
            <li id = "aquiTipo">${pokemon.tipo1}${tipo2} </li>
        </ol>
    </div>`
    carta.className = "carta"
    galeria$$.appendChild(carta)


    }
}



const searchPokemons = (busqueda,mappedPokemons) => {
    const filteredPokemon = mappedPokemons.filter((mappedPokemon) =>mappedPokemon.name.toLowerCase().includes(busqueda.toLowerCase()) || mappedPokemon.tipo1.toLowerCase() == busqueda.toLowerCase());
    drawPokemon(filteredPokemon)
}



init()

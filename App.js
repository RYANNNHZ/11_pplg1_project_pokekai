let offset = 0;
const limit = 20;

async function getPokemon() {
    try {
        const content = document.getElementById("content-pokekai");
        const spiner = document.getElementById("spiner");
        spiner.innerHTML = `<div class="col-12 d-flex justify-content-center">
                                <div class="spinner-border text-warning" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>`;

        const endpoint = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
        const api = await endpoint.json();
        const pokemons = api.results;
        content.innerHTML = "";
        for (let pokemon of pokemons) {
            const pokeEndpoint = await fetch(pokemon.url);
            const pokemonData = await pokeEndpoint.json();
            content.innerHTML += `<div data-aos="fade-up" class="col-12 col-md-6 col-lg-4 col-xl-3  my-3">
                                        <div class="card rounded-5" style="background:#222022;"  onclick="showDetails('${pokemon.url}')">
                                            <img class="card-img-top" src="${pokemonData.sprites.front_default}" />
                                        </div>
                                    </div>`;
        }
        
        spiner.innerHTML = "";
        updatePaginationButtons();
    } catch (error) {
        console.log(error);
    }
}

async function showDetails(url) {
    try {
        const response = await fetch(url);
        const pokemon = await response.json();
        Swal.fire({
          imageUrl: pokemon.sprites.front_default,
          imageAlt: pokemon.name,
          html: `
              <table class="table-dark">
        <tbody>
        <tr>
            <td>name</td>
            <td>:</td>
            <td><b>${pokemon.name}</b></td>
          </tr>
          <tr>
            <td>type</td>
            <td>:</td>
            <td>${pokemon.types[0].type.name}</td>
          </tr>
        </tbody>
      </table>
              <div class="progress my-2">
                  <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="${pokemon.stats[0].base_stat}"
                  aria-valuemin="0" aria-valuemax="100" style="width:${pokemon.stats[0].base_stat}%">
                    <span class="sr-only">${pokemon.stats[0].base_stat}  ${pokemon.stats[0].stat.name}</span>
                  </div>
                </div> 
      
                        
              <div class="progress my-2">
              <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="${pokemon.stats[1].base_stat}"
              aria-valuemin="0" aria-valuemax="100" style="width:${pokemon.stats[1].base_stat}%">
                <span class="sr-only">${pokemon.stats[1].base_stat}  ${pokemon.stats[1].stat.name}</span>
              </div>
            </div> 
      
                    
            <div class="progress my-2">
            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="${pokemon.stats[2].base_stat}"
            aria-valuemin="0" aria-valuemax="100" style="width:${pokemon.stats[2].base_stat}%">
              <span class="sr-only">${pokemon.stats[2].base_stat}  ${pokemon.stats[2].stat.name}</span>
            </div>
          </div> 
      
      
                  
          <div class="progress my-2">
          <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="${pokemon.stats[3].base_stat}"
          aria-valuemin="0" aria-valuemax="100" style="width:${pokemon.stats[3].base_stat}%">
            <span class="sr-only">${pokemon.stats[3].base_stat}  ${pokemon.stats[3].stat.name}</span>
          </div>
        </div> 
      
      
                
        <div class="progress my-2">
        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="${pokemon.stats[4].base_stat}"
        aria-valuemin="0" aria-valuemax="100" style="width:${pokemon.stats[4].base_stat}%">
          <span class="sr-only">${pokemon.stats[4].base_stat}  ${pokemon.stats[4].stat.name}</span>
        </div>
      </div> 
      
      
              
      <div class="progress my-2">
      <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="${pokemon.stats[5].base_stat}"
      aria-valuemin="0" aria-valuemax="100" style="width:${pokemon.stats[5].base_stat}%">
        <span class="sr-only">${pokemon.stats[5].base_stat}  ${pokemon.stats[5].stat.name}</span>
      </div>
      </div> 
      
      
          `,
          showCloseButton: true,
          imageWidth: 300,
          imageHeight: 300,
          confirmButtonColor: '#ffca00',
          background:'#222022'
      
              });
    } catch (error) {
        console.log(error);
    }
}

async function nextPage() {
    offset += limit;
    await getPokemon();
}

async function prevPage() {
    offset = Math.max(0, offset - limit);
    await getPokemon();
}

function updatePaginationButtons() {
    document.getElementById("prevBtn").disabled = offset === 0;
    // Assuming there are always more Pokémon to fetch
    document.getElementById("nextBtn").disabled = false;
}


getPokemon();
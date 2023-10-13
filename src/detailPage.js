
let koreanTypeName = [];
let pokemonList = [];

/** 포켓몬 상세 페이지 */
async function detailPageClick(id, pokemonList) {
    /* 페이지 전환 */
    koreanTypeName.length = 0;

    await loadPokemon(id)
    await setData(id, pokemonList);
    
}

let spec;
async function loadPokemon(id) {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        spec = {
                weight: response.data.weight,
                height: response.data.height
        }
        await response.data.types.map(async (type) => {
                const typeResponse = await axios.get(type.type.url)
                .then((typeResponse) => {
                    const koName = typeResponse.data.names.find((name) => name.language.name === 'ko').name;
                    koreanTypeName.push(koName);
                })
            })
    } catch (error) {
        console.error()
    } finally {

    }
};

async function setData(id, pokemonList) {
    return new Promise(()=>{
        const name = document.getElementById('detail_name');
        const type = document.getElementById('type');
        const image = document.getElementById('pkimg');
        const weight = document.getElementById('weight');
        const height = document.getElementById('height');
        const dId = document.getElementById('dId');
        type.innerText = ''
        name.innerText = ''
        image.src = ''
        height.innerText = ''
        weight.innerText = ''

        setTimeout(()=>{

            const wrapper = document.getElementById('wrapper');
            const detail_wrapper = document.getElementById('detail_wrapper');
            wrapper.style.display = 'none';
            detail_wrapper.style.display = 'flex';
            detail_wrapper.style.visibility = 'visible';

            // loading_page.style.display = 'none';
            image.src = pokemonList[id - 1].img;
            image.style.width = "400px"
            image.style.height = "400px"

            const des = document.getElementById('des');
            name.innerHTML = pokemonList[id - 1].name;
            for (let typeName of koreanTypeName) {
                type.innerText += typeName + `,`;
            }
            dId.innerText = `No.`+ id;
            type.innerText = type.innerText.slice(0, -1)
            height.innerText = spec.weight;
            weight.innerText = spec.height;
        }, 1000);
    })
}


const searchButton = () => {
    const text = document.getElementById("search_text").value;
    const pockemonList = document.getElementById('pokemon_list');
    pockemonList.remove();
    const pockemonSearch = document.getElementById('pokemon_list_search');
    window.removeEventListener('scroll', () => {})
    
    pockemonSearch.innerHTML = ''
    pokemonList.find((pokemon) => {
        if (pokemon.name.includes(text)) {
            const id = document.createElement("div");
            id.setAttribute("class", id);
            id.innerText = `No.${pokemon.id}`;
    
            const name = document.createElement("div");
            name.setAttribute("class", name);
            name.innerText = pokemon.name;
    
            const div = document.createElement("div");
            div.setAttribute("class", `pokemon`);
    
            const img = document.createElement("img");
            img.loading = 'lazy'
            img.src = pokemon.img;
            img.style.width = "120px"
    
            div.style.backgroundColor = "beige"
            div.style.margin = "30px"
            div.style.display = "flex"
            div.style.flexDirection = "column"
            div.style.padding = "20px"
            div.style.alignItems = "center"
            
            div.onclick = () => {
                detailPageClick(pokemon.id, pokemonList);
            }
            div.onmouseover = () => {
                div.style.translate = "0 -20px"
                div.style.backgroundColor = "rgb(150, 150, 125)"
                div.style.transition = "all 1s ease-in"
            }
            div.onmouseleave = () => {
                div.style.backgroundColor = "beige"
                div.style.translate = "initial"
                div.style.transition = "all 1s ease-in"
            }
    
            div.appendChild(img);
            div.appendChild(id);
            div.appendChild(name);
    
            pockemonSearch.appendChild(div);
            // 모듈화된 거 가져와서 셋팅
        }
    })


}

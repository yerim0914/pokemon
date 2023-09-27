let pokemonList = undefined;
let pokemonDetail = undefined;

/** 포켓몬스터 갤러리 */
const createGallery = () => {
    const pockemonList = document.getElementById('pokemon_list');
    for (let i = 0; i < pokemonList.length; i++ ){
        const id = document.createElement("div");
        id.setAttribute("class", id);
        id.innerText = `No.${pokemonList[i].id}`;

        const name = document.createElement("div");
        name.setAttribute("class", name);
        name.innerText = pokemonList[i].name;

        const div = document.createElement("div");
        div.setAttribute("class", `pokemon`);

        const img = document.createElement("img");
        img.loading = 'lazy'
        img.src = pokemonList[i].img;
        img.style.width = "120px"

        div.style.backgroundColor = "beige"
        div.style.margin = "30px"
        div.style.display = "flex"
        div.style.flexDirection = "column"
        div.style.padding = "20px"
        div.style.alignItems = "center"
        
        div.onclick = () => {
            detailPageClick(pokemonList[i].id);
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

        pockemonList.appendChild(div);
    }
}

let ability = [];
const urls = [];

for (let i = 0 ; i < 500; i++) {
    // let url = `https://pokeapi.co/api/v2/ability/${id + 1}/`
    let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;
    urls.push(url);
}

let requests = urls.map(url => fetch(url));
let koreanNames = [];
let koreanTypeNames = [];

Promise.all(requests)
    .then((responses) => Promise.all(responses.map(res => res.json())))
    .then(results => {
        for (let result of results) {
            const koreanName = result.names.find((name) => name.language.name === "ko");
            koreanNames.push(koreanName.name);
        }

        callList()
})

async function callList() {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=500&offset=${0}`);
        const data = response.data.results;
                
        pokemonList = data.map((pokemon, index) => {
            return {
                id: index + 1,
                name: koreanNames[index],
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index+1}.png`
            }
        })
        createGallery();
    } catch (error) {
        console.log('끝')
    }
};




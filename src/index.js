
let pokemonList = [];
let pokemonDetail = [];

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
            detailPageClick(pokemonList[i].id, pokemonList);
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

let page = 0;

/** 첫 페이지 수행 */
callList();


window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        callList();
    }
});


async function callList() {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${page}`);
        const data = response.data.results;
     
        pokemonList = await Promise.all(data.map(async (pokemon, index) => {
            let rId = 30 * page + index;
            return {
                id: rId + 1,
                name: await callName(rId),
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${rId+1}.png`
            }
        }))
        page += 1;
        createGallery();
    } catch (error) {
        console.log('끝')
    }
};


async function callName(rId) {
    const response_name = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${rId + 1}`);
    let koreanName;
    koreanName = response_name.data.names.find((name) => name.language.name === "ko").name;
    return koreanName;
}

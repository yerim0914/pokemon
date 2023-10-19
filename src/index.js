
let pokemonDetail = [];
let page = 0;

/** 포켓몬스터 갤러리 */
const createGallery = () => {
    const pockemonList = document.getElementById('pokemon_list');
    for (let i = 0; i < 30; i++){
        let rId = 30 * page + i;
        if (rId >= 999) {
            break;
        }
        const id = document.createElement("div");
        id.setAttribute("class", id);
        id.innerText = `No.${pokemonList[rId].id}`;

        const name = document.createElement("div");
        name.setAttribute("class", name);
        name.innerText = pokemonList[rId].name;

        const div = document.createElement("div");
        div.setAttribute("class", `pokemon`);

        const img = document.createElement("img");
        img.loading = 'lazy'
        img.src = pokemonList[rId].img;
        img.style.width = "120px"

        div.style.backgroundColor = "beige"
        div.style.margin = "30px"
        div.style.display = "flex"
        div.style.flexDirection = "column"
        div.style.padding = "20px"
        div.style.alignItems = "center"
        div.style.cursor = "pointer"

        div.onclick = () => {
            detailPageClick(pokemonList[rId].id, pokemonList);
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



defaultCallList();


const title = document.getElementById('title');
title.addEventListener('click', () => {
    location.reload();
});

// 스크롤 시 html dom 생성
const pockemonList = document.getElementById('pokemon_list');
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        createGallery();
        page += 1;
    }
});

const defaultData = 90

async function defaultCallList() {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1010&offset=${0}`);
        const data = response.data.results;

        const promises = (data.map(async (pokemon, index) => {
            const name = await callName(index + 1);
            return (
                {
                    id: index + 1,
                    name,
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index+1}.png`
                }
            )
        }))
        
        const resultData = await Promise.all(promises)
        pokemonList = pokemonList.concat(resultData);
    
        /** 첫 페이지 수행 */
        createGallery();
        // callList();
        page += 1;
    } catch (error) {
        console.log('끝')
    }
};

async function callList() {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=1010&offset=${defaultData}`);
        const data = response.data.results;

        await Promise.all(data.map(async (pokemon, index) => {
            pokemonList.push(
                    {
                    id: index + 1 + defaultData,
                    name: await callName(index + defaultData + 1),
                    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index+1+defaultData}.png`
                }
            )
        }))
    
        /** 첫 페이지 수행 */
        // createGallery();
        page += 1;
    } catch (error) {
        console.log('끝')
    }
};


async function callName(rId) {
    const response_name = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${rId}`);
    let koreanName;
    koreanName = response_name.data.names.find((name) => name.language.name === "ko").name;
    return koreanName;
}


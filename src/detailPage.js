let koreanTypeName = [];

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
let koreanTypeName = [];

/** 포켓몬 상세 페이지 */
async function detailPageClick(id) {
    /* 페이지 전환 */
    const wrapper = document.getElementById('wrapper');
    const detail_wrapper = document.getElementById('detail_wrapper');
    wrapper.style.display = 'none';
    detail_wrapper.style.display = 'flex';
    detail_wrapper.style.visibility = 'visible';
    koreanTypeName.length = 0;

    await loadPokemon(id)
    await setData(id);
    
    
}
let spec;
async function loadPokemon(id) {
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
    console.log('끝')
};

async function setData(id) {
    return new Promise(()=>{
        const loading_page = document.getElementById('loading_page');
        const name = document.getElementById('detail_name');
        const type = document.getElementById('type');
        const image = document.getElementById('pkimg');
        const weight = document.getElementById('weight');
        const height = document.getElementById('height');
        const dId = document.getElementById('dId');
        type.innerText = ''
        name.innerText = ''

        // 로딩페이지
        loading_page.style.display = 'flex';
        loading_page.style.width = '100%';
        loading_page.style.height = '100%';
        loading_page.style.zIndex = 1;


        setTimeout(()=>{
            loading_page.style.display = 'none';
            image.src = pokemonList[id - 1].img
            image.style.width = "400px"
            image.style.height = "400px"

            const des = document.getElementById('des');
            name.innerHTML = koreanNames[id - 1];
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
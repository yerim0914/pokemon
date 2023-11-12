async function searchButton() {
    let indexFile = await import('./index.js');
    const pokemonList = indexFile.pokemonList;
    const text = document.getElementById("search_text").value;
    const pockemonList = document.getElementById('pokemon_list');
    if (pockemonList !== null) {
        pockemonList.remove();
    }
    const pockemonSearch = document.getElementById('pokemon_list_search');
    window.removeEventListener('scroll', () => {})
    
    pockemonSearch.innerHTML = ''
    const result = pokemonList.find((pokemon) => {
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

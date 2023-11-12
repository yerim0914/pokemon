/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// import 'src/style/index.css'\r\n\r\nlet pokemonList = undefined;\r\nlet pokemonDetail = undefined;\r\n\r\n/** 포켓몬스터 갤러리 */\r\nconst createGallery = () => {\r\n    const pockemonList = document.getElementById('pokemon_list');\r\n    for (let i = 0; i < pokemonList.length; i++ ){\r\n        const id = document.createElement(\"div\");\r\n        id.setAttribute(\"class\", id);\r\n        id.innerText = `No.${pokemonList[i].id}`;\r\n\r\n        const name = document.createElement(\"div\");\r\n        name.setAttribute(\"class\", name);\r\n        name.innerText = pokemonList[i].name;\r\n\r\n        const div = document.createElement(\"div\");\r\n        div.setAttribute(\"class\", `pokemon`);\r\n\r\n        const img = document.createElement(\"img\");\r\n        img.loading = 'lazy'\r\n        img.src = pokemonList[i].img;\r\n        img.style.width = \"120px\"\r\n\r\n        div.style.backgroundColor = \"beige\"\r\n        div.style.margin = \"30px\"\r\n        div.style.display = \"flex\"\r\n        div.style.flexDirection = \"column\"\r\n        div.style.padding = \"20px\"\r\n        div.style.alignItems = \"center\"\r\n        \r\n        div.onclick = () => {\r\n            detailPageClick(pokemonList[i].id);\r\n        }\r\n        div.onmouseover = () => {\r\n            div.style.translate = \"0 -20px\"\r\n            div.style.backgroundColor = \"rgb(150, 150, 125)\"\r\n            div.style.transition = \"all 1s ease-in\"\r\n        }\r\n        div.onmouseleave = () => {\r\n            div.style.backgroundColor = \"beige\"\r\n            div.style.translate = \"initial\"\r\n            div.style.transition = \"all 1s ease-in\"\r\n        }\r\n\r\n        div.appendChild(img);\r\n        div.appendChild(id);\r\n        div.appendChild(name);\r\n\r\n        pockemonList.appendChild(div);\r\n    }\r\n}\r\n\r\nlet ability = [];\r\nconst urls = [];\r\n\r\nfor (let i = 0 ; i < 500; i++) {\r\n    // let url = `https://pokeapi.co/api/v2/ability/${id + 1}/`\r\n    let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;\r\n    urls.push(url);\r\n}\r\n\r\nlet requests = urls.map(url => fetch(url));\r\nlet koreanNames = [];\r\nlet koreanTypeNames = [];\r\n\r\nPromise.all(requests)\r\n    .then((responses) => Promise.all(responses.map(res => res.json())))\r\n    .then(results => {\r\n        for (let result of results) {\r\n            const koreanName = result.names.find((name) => name.language.name === \"ko\");\r\n            koreanNames.push(koreanName.name);\r\n        }\r\n\r\n        callList()\r\n})\r\n\r\nasync function callList() {\r\n    try {\r\n        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=500&offset=${0}`);\r\n        const data = response.data.results;\r\n                \r\n        pokemonList = data.map((pokemon, index) => {\r\n            return {\r\n                id: index + 1,\r\n                name: koreanNames[index],\r\n                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${index+1}.png`\r\n            }\r\n        })\r\n        createGallery();\r\n    } catch (error) {\r\n        console.log('끝')\r\n    }\r\n};\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://home/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;
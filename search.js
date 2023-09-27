const search = () => {
    const text = document.getElementById("search_text").value;
    koreanNames.find((name) => {
        if (name.includes(text)) {
            // 모듈화된 거 가져와서 셋팅
        }
    })
}
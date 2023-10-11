const prevPage = () => {
    const wrapper = document.getElementById('wrapper');
    const detail_wrapper = document.getElementById('detail_wrapper');
    detail_wrapper.style.display = 'none';
    wrapper.style.display = 'flex';
    wrapper.style.visibility = 'visible';
}
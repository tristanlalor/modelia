let sumCollapseNav = () => {
    let nav = document.querySelector('.sum-nav');
    let content = document.querySelector('.sum-content');
    content.classList.toggle('sum-full');
    nav.style.transform === 'translateX(-100%)' ? nav.style.transform = 'translateX(0)' : nav.style.transform = 'translateX(-100%)';
    document.querySelector('.sum-collapse-nav').classList.toggle('sum-collapse-nav-collapsed');
    document.querySelector('.sum-search').classList.toggle('sum-search-fs');
}
//Add parallax to img in abt tab
const parallax1 = document.querySelector('#abt-parallax-1');
const abt = document.querySelector('.abt');
abt.addEventListener('scroll', () => {
    let scroll = abt.scrollTop;
    parallax1.style.transform = `translateY(calc(${scroll * 0.3}px - 200px))`;
});
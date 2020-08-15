const parallax1 = document.querySelector('#abt-parallax-1');
// const parallax2 = document.querySelector('#abt-parallax-2');
const abt = document.querySelector('.abt');
abt.addEventListener('scroll', () => {
    let scroll = abt.scrollTop;
    // const offset = abt.getBoundingClientRect().top - abt.offsetParent.getBoundingClientRect().top;
    console.log(scroll);

    parallax1.style.transform = `translateY(calc(${scroll * 0.3}px - 200px))`;
    // parallax2.style.transform = `translateY(calc(${scroll * 0.3}px - 500px))`;
});

// document.querySelector('.all-pages-container').style.transform = "translate(-200vw)";
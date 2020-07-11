let fsCollapseNav = () => {
    let nav = document.querySelector('.fs-nav');
    let content = document.querySelector('.fs-content');
    content.classList.toggle('fs-full');
    nav.style.transform === 'translateX(-100%)' ? nav.style.transform = 'translateX(0)' : nav.style.transform = 'translateX(-100%)';
    document.querySelector('.fs-collapse-nav').classList.toggle('fs-collapse-nav-collapsed');
}


//Add selected class to fs-nav-items
document.querySelector('.fs-nav').addEventListener('click', e => {
    if (e.target.classList.contains('fs-nav-item')) {
        Array.prototype.slice.call(document.querySelectorAll(".fs-nav-item")).forEach((el, index) => {
           el.classList.remove('selected');
        });
        e.target.classList.add('selected');
    }
});


// let maxFlexGrow = 1;
    
// let statementHoverIn = (event) => {
//     if (event.target.style.flexGrow == 1) {
//         maxFlexGrow == 1 ? event.target.style.flexGrow = '1.25' : event.target.style.flexGrow = '2';
//     };
//     if (maxFlexGrow > 1 && event.target.style.flexGrow < 13) {
//         event.target.style.maxWidth = '80px';
//     }
// };

// let statementHoverOut = (event) => {
//     if (event.target.style.flexGrow != 13) {
//         event.target.style.flexGrow = '1';
//     }
//     if (maxFlexGrow > 1 && event.target.style.flexGrow < 13) {
//         event.target.style.maxWidth = '60px';
//     }
// };

// let statementClick = (event) => {
//     Array.prototype.slice.call(document.querySelectorAll(".statement")).forEach(el => {
//         if (el === event.target) {
//             event.target.style.flexGrow = '13';
//             event.target.children[0].classList.add('hidden');
//             event.target.children[1].classList.remove('hidden');
//             maxFlexGrow = 13;
//             event.target.style.maxWidth = '100vw';
//         } else {
//             el.style.flexGrow = '1';
//             el.children[0].classList.remove('hidden');
//             el.children[1].classList.add('hidden');
//             el.style.width = '60px';
//             el.style.maxWidth = '60px';
//         }
//     });
// }
// Array.prototype.slice.call(document.querySelectorAll(".statement")).forEach(el => {
//     el.addEventListener('mouseenter', statementHoverIn);
//     el.addEventListener('mouseleave', statementHoverOut);
//     el.addEventListener('click', statementClick);
//     el.style.flexGrow = '1';
// });
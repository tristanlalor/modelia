// import * as graphlib from '/graphs.js';



// const am4core = require("https://cdn.amcharts.com/lib/4/core.js");
// const am4charts = require("https://cdn.amcharts.com/lib/4/charts.js");
let timer;
let scaling;
let clickHappening = false;
let activeClass = "fs";

//remove load screen
// setTimeout(() => {
//     document.querySelector('.load-screen').style.opacity = '0';
// },100);




const newClickFunction = (e) => {
    console.log("Mouse Over");
                toggleHamburger();
                !menuOpen ? document.querySelector('.page-selector').style.transform = `translateX(0)` : document.querySelector('.page-selector').style.transform = `translateX(calc(${lastTranslateAmtSelector}vw + 2vw + 102.5px))`;
                ;
                if (document.querySelector('.active').classList.contains("scale")) {
                    // window.requestAnimationFrame(() => {
                    //     document.querySelector('.all-pages-container').classList.add("scale");
                    //     window.requestAnimationFrame(() => {
                    //         document.querySelector('.all-pages-container').classList.remove("scale");
                    //     });
                    // });
                    Array.prototype.slice.call(document.querySelectorAll(".container")).forEach((el, index) => {
                        el.classList.remove("scale");
                    });
                    console.log("CREATING EVENT LISTENER");
                    document.querySelector(".all-pages-container").addEventListener("click", newClickFunction);

                    // document.querySelector('.all-pages-container').style.transform = "scale(.8)";
                    Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
                        let scaleFactor = (index) * 25;
                        let ele = document.querySelector(`.btn-${index+1}`);
                        ele.style.transform = `translateX(calc(${scaleFactor}vw + 2vw))`;
                        ele.style.opacity = 1;
                        setTimeout(() => {
                            ele.style.pointerEvents = 'auto';
                        }, 400)
                        document.querySelector(`.ghost`).style.transform = "scaleX(6.2)";
                    });
                } else {
                    // document.querySelector('.all-pages-container').style.transform = "scale(1)";
                    // window.requestAnimationFrame(() => {
                    //     document.querySelector('.all-pages-container').classList.remove("scale");
                    //     window.requestAnimationFrame(() => {
                    //         document.querySelector('.all-pages-container').classList.add("scale");
                    //     });
                    console.log("DESTROYING EVENT LISTENER");
                        document.querySelector(".all-pages-container").removeEventListener("click", newClickFunction);

                    // });
                        Array.prototype.slice.call(document.querySelectorAll(".container")).forEach((el, index) => {
                            el.classList.add("scale");
                        });
                        Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
                            let ele = document.querySelector(`.btn-${index+1}`)
                            ele.style.transform = `translateX(0px)`;
                            ele.style.opacity = 0;
                            ele.style.pointerEvents = 'none';
                            document.querySelector(`.ghost`).style.transform = "scaleX(1)";
                        });
                };
}

let transition = () => {
    // document.querySelector(".transition").classList.add("slide-in");
    // setTimeout(() => {
    //     document.querySelector(".transition").classList.remove("slide-in");
    // }, 400);
};

let mouseEnter = (color) => {
    // if (!clickHappening) {
    //     document.querySelector(".transition").classList.add("peak-in");
    // }
};
// let timer;
let mouseOver = () => {
    if (event.relatedTarget == null || !event.relatedTarget.classList.contains('btn') && !event.relatedTarget.classList.contains('ghost') && !event.relatedTarget.classList.contains('ham-icon') && !event.relatedTarget.classList.contains('hamburger')){
        clearTimeout(timer);
        scaling = true;
        setTimeout(() => {
            scaling = false
        }, 650);
        timer = setTimeout(function(){
            if (!clickHappening) {
                console.log("Mouse Over");
                addHamburger();
                if (document.querySelector('.all-pages-container').classList.contains("scale")) {
                    document.querySelector('.all-pages-container').classList.remove("scale");
                };
                Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
                    let scaleFactor = (index+1) * 55;
                    let ele = document.querySelector(`.btn-${index+1}`);
                    ele.style.transform = `translateX(${scaleFactor}px)`;
                    ele.style.opacity = 1;
                    setTimeout(() => {
                        ele.style.pointerEvents = 'auto';
                    }, 400)
                    document.querySelector(`.ghost`).style.transform = "scaleX(6.2)";
                });
            }
        }, 310);
    }
}

let mouseLeaveBtns = (event) => {
    console.log(event.relatedTarget);
    // console.log(event.relatedTarget.classList.contains('ghost'));
    // console.log(event.relatedTarget == document.querySelector('.ghost'));
    // document.querySelector(".transition").classList.remove("peak-in");
    if (event.relatedTarget == null || !event.relatedTarget.classList.contains('ghost') && !event.relatedTarget.classList.contains('btn') && !event.relatedTarget.classList.contains('ham-icon') && !event.relatedTarget.classList.contains('hamburger')) {
        clearTimeout(timer);
        // timer = 0;
        console.log('mouseleave');
        let scalePage = (e) => {
            if (!docked){
                // if (!document.querySelector('.all-pages-container').classList.contains("scale")) {
                //     document.querySelector('.all-pages-container').classList.add("scale");
                // }
            }
            if (e) e.target.removeEventListener(e.type, scalePage);
        }
        if (!scaling) {
            scalePage();
        } else {
            document.querySelector('.all-pages-container').addEventListener('transitionend', scalePage);
        }
        Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
            let ele = document.querySelector(`.btn-${index+1}`)
            ele.style.transform = `translateX(0px)`;
            ele.style.opacity = 0;
            ele.style.pointerEvents = 'none';
            document.querySelector(`.ghost`).style.transform = "scaleX(1)";
        });
        removeHamburger();
    }
}
let menuOpen = false;
let toggleHamburger = (event) => {
    menuOpen = !menuOpen;
    console.log(`menuOpen = ${menuOpen}`);
    document.querySelector('.ham-icon').classList.toggle('hamburger-active')
};
let removeHamburger = (event) => {
    menuOpen = false;
    document.querySelector('.ham-icon').classList.remove('hamburger-active')
};
let addHamburger = (event) => {
    document.querySelector('.ham-icon').classList.add('hamburger-active')
};
// document.querySelector('.ham-icon').addEventListener('click', toggleHamburger);

// ###########################################################

let removeElement = (element) => {
    // Removes an element from the document
    element.parentNode.removeChild(element);
}




// ###########################################################



let transitionElement = document.querySelector('.transition');
let scaleX = 0;
transitionElement.style.left = '0%';
transitionElement.style.transform = "scaleX(" + scaleX + ")";
// transitionElement.style.transition = '0s';
let backdown = false;

let animateTransition = () => {
    {
        /*if (scaleX < 1 && !backdown) {
            scaleX = scaleX + .01;
            transitionElement.style.transform = "scaleX(" + scaleX + ")";
            console.log('up');
            console.log(backdown);
            requestAnimationFrame(animateTransition);
        }
        else if (scaleX === 1) {
            backdown = true;
            transitionElement.style.left = '100%';
            scaleX = scaleX - .01;
            transitionElement.style.transform = "scaleX(" + scaleX + ")";
            console.log('down');
            requestAnimationFrame(animateTransition);
        } else if (scaleX > 0) {
            backdown = true;
            scaleX = scaleX - .01;
            transitionElement.style.transform = "scaleX(" + scaleX + ")";
            console.log('down');
            console.log(backdown);
            requestAnimationFrame(animateTransition);
        }
        else {
            transitionElement.style.left = '0%';
            console.log('done');
        }*/
        
    }
    if (transitionElement.style.transform == "scaleX(0)") {
        transitionElement.style.transition = ".15s cubic-bezier(.95,.0,1,.95)";
        transitionElement.style.transform = "scaleX(1)";
        requestAnimationFrame(animateTransition);
    }
    // if (transitionElement.style.transform == "scaleX(1)") {
    //     transitionElement.style.transform = "translate(100vw)";
    //     requestAnimationFrame(animateTransition);
        
    // }
}
transitionElement.addEventListener('transitionend', (event) => {
    // if (event.target == document.querySelector('.transition')) {
        if (transitionElement.style.transform == "scaleX(1)") {
            //remove active from all containers (hide them)
            Array.prototype.slice.call(document.querySelectorAll(".container")).forEach(el => {
                if (!el.classList.contains(activeClass) && !el.classList.contains('transition')) {
                    el.classList.remove('active');
                }
            });
            document.querySelector(`.${activeClass}`).classList.add('active');
            setTimeout(() => {
                transitionElement.style.transition = ".15s cubic-bezier(0,.05,.05,1.00)";
                transitionElement.style.transform = "translate(100%)";
            }, 10);
        } else {
            transitionElement.style.transform = "scaleX(0)";
        }
    // };
})

window.lastTranslateAmtSelector = 0;
window.lastTranslateAmt = 0;
// set up nav btns
Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
    let className;
    let colors = ["#a3927a", "#97a6a0", "#2a3436", "#37344a", "#3d2947"];

    //add mouseenter response
    el.addEventListener('mouseenter', mouseEnter);
    el.addEventListener('mouseenter', (event) => {
        // document.querySelector('.transition').style.backgroundColor = colors[index];
        // document.querySelector('.transition').style.backgroundColor = 'rgb(0,0,0)';
        let translateAmt = 100 * index;
        
        document.querySelector('.all-pages-container').style.transform = `translateX(-${translateAmt}vw)`;
        lastTranslateAmt = translateAmt;
        let translateAmtSelector = (index) * 25;
        lastTranslateAmtSelector = translateAmtSelector;
        document.querySelector('.page-selector').style.transform = `translateX(calc(${translateAmtSelector}vw + 2vw + 102.5px))`;

        Array.prototype.slice.call(document.querySelectorAll('.btn')).forEach((el, index) => {
            el.classList.remove('btn-active');
        });
        event.target.classList.add('btn-active');



    });
    
    //add mouseout response
    // el.addEventListener("mouseleave", mouseLeaveBtns);

    //add click response
    el.addEventListener('click', (event) => {
        console.log("DESTROYING EVENT LISTENER");
                        document.querySelector(".all-pages-container").removeEventListener("click", newClickFunction);
        let translateAmt = 100 * index;
        document.querySelector('.all-pages-container').style.transform = `translateX(-${translateAmt}vw)`;
        document.querySelector('.page-selector').style.transform = `translateX(0)`;
        Array.prototype.slice.call(document.querySelectorAll(".container")).forEach((el, index) => {
            el.classList.add("scale");
        });
        // document.querySelector(".transition").classList.remove("peak-in");
        clickHappening = true;
        clearTimeout(timer);
        // setTimeout(clearTimeout(timer), 399);
        setTimeout(() => {clickHappening = false;}, 400);
        Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
            let ele = document.querySelector(`.btn-${index+1}`)
            ele.style.transform = `translateX(0px)`;
            ele.style.opacity = 0;
            ele.style.pointerEvents = 'none';
            document.querySelector(`.ghost`).style.transform = "scaleX(1)";
        });
        removeHamburger();

        docked = false;

        //do the transition
        // transition(); // old
        // animateTransition();

        //if page is not yet full screen, go to full screen
        // if (!document.querySelector('.all-pages-container').classList.contains("scale")) {
        //     document.querySelector('.all-pages-container').classList.add("scale");
        // }


        //create timer for when page is fully covered by transition (200ms)
        className = Array.prototype.slice.call(document.querySelectorAll(".container"))[index].classList[0];
        
        // document.querySelector(`.${className}`).classList.add('active');
        activeClass = className
        setTimeout(() => {

            // //remove active from all containers (hide them)
            // Array.prototype.slice.call(document.querySelectorAll(".container")).forEach(el => {
            //     if (!el.classList.contains(className)) {
            //         el.classList.remove('active');
            //     }
            // });

            //set the class of the corresponding html tab that the button corresponds with
            // className = Array.prototype.slice.call(document.querySelectorAll(".container"))[index].classList[0];

            // //add active to selected element
            // document.querySelector(`.${className}`).classList.add('active');
        }, 200);
    });
});
let docked = false;

const arrowHandler = (num) => {
    let translateAmt = lastTranslateAmt + num;
    document.querySelector('.all-pages-container').style.transform = `translateX(-${translateAmt}vw)`;
    lastTranslateAmt = translateAmt;
    let index = translateAmt / 100;
    let translateAmtSelector = (index) * 25;
    lastTranslateAmtSelector = translateAmtSelector;
    if (!document.querySelector('.active').classList.contains("scale")) {
        document.querySelector('.page-selector').style.transform = `translateX(calc(${translateAmtSelector}vw + 2vw + 102.5px))`;
    }
    // document.querySelector('.page-selector').style.transform = `translateX(calc(${translateAmtSelector}vw + 2vw + 102.5px))`;
    Array.prototype.slice.call(document.querySelectorAll('.btn')).forEach((el, btnIndex) => {
        index == btnIndex ? el.classList.add('btn-active') : el.classList.remove('btn-active');
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key == "ArrowRight") {
        e.preventDefault();
        if (lastTranslateAmt < 300) {
            arrowHandler(100);
        }
    } else if (e.key == "ArrowLeft") {
        e.preventDefault();
        if (lastTranslateAmt > 0) {
            arrowHandler(-100);
        }
    }
})



document.querySelector(".hamburger").addEventListener("click", newClickFunction);
document.querySelector(".ham-icon").addEventListener("click", newClickFunction);
document.querySelector(".ghost").addEventListener("click", newClickFunction);


document.addEventListener("click", e => {
    console.log(e.target);
});



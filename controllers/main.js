let timer;
let scaling;
let clickHappening = false;
let activeClass = "fs";

// remove load screen
setTimeout(() => {
    document.querySelector('.load-screen').style.opacity = '0';
},100);

const newClickFunction = (e) => {
    //Mouse Over
    toggleHamburger();
    !menuOpen ? document.querySelector('.page-selector').style.transform = `translateX(0)` : document.querySelector('.page-selector').style.transform = `translateX(calc(${lastTranslateAmtSelector}vw + 2vw + 102.5px))`;
    ;
    if (document.querySelector('.active').classList.contains("scale")) {
        Array.prototype.slice.call(document.querySelectorAll(".container")).forEach((el, index) => {
            el.classList.remove("scale");
        });
        //CREATING EVENT LISTENER
        document.querySelector(".all-pages-container").addEventListener("click", newClickFunction);
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
        //DESTROYING EVENT LISTENER
        document.querySelector(".all-pages-container").removeEventListener("click", newClickFunction);
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

let mouseOver = () => {
    if (event.relatedTarget == null || !event.relatedTarget.classList.contains('btn') && !event.relatedTarget.classList.contains('ghost') && !event.relatedTarget.classList.contains('ham-icon') && !event.relatedTarget.classList.contains('hamburger')){
        clearTimeout(timer);
        scaling = true;
        setTimeout(() => {
            scaling = false
        }, 650);
        timer = setTimeout(function(){
            if (!clickHappening) {
                //Mouse Over
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
    if (event.relatedTarget == null || !event.relatedTarget.classList.contains('ghost') && !event.relatedTarget.classList.contains('btn') && !event.relatedTarget.classList.contains('ham-icon') && !event.relatedTarget.classList.contains('hamburger')) {
        clearTimeout(timer);
        //mouseleave
        let scalePage = (e) => {
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
    document.querySelector('.ham-icon').classList.toggle('hamburger-active')
};
let removeHamburger = (event) => {
    menuOpen = false;
    document.querySelector('.ham-icon').classList.remove('hamburger-active')
};
let addHamburger = (event) => {
    document.querySelector('.ham-icon').classList.add('hamburger-active')
};

let removeElement = (element) => {
    // Removes an element from the document
    element.parentNode.removeChild(element);
}

let transitionElement = document.querySelector('.transition');
let scaleX = 0;
transitionElement.style.left = '0%';
transitionElement.style.transform = "scaleX(" + scaleX + ")";
let backdown = false;

transitionElement.addEventListener('transitionend', (event) => {
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
})

window.lastTranslateAmtSelector = 0;
window.lastTranslateAmt = 0;
// set up nav btns
Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
    let className;

    //add mouseenter response
    el.addEventListener('mouseenter', (event) => {
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
    

    //add click response
    el.addEventListener('click', (event) => {
        //DESTROYING EVENT LISTENER
        document.querySelector(".all-pages-container").removeEventListener("click", newClickFunction);
        let translateAmt = 100 * index;
        document.querySelector('.all-pages-container').style.transform = `translateX(-${translateAmt}vw)`;
        document.querySelector('.page-selector').style.transform = `translateX(0)`;
        Array.prototype.slice.call(document.querySelectorAll(".container")).forEach((el, index) => {
            el.classList.add("scale");
        });
        clickHappening = true;
        clearTimeout(timer);
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
        className = Array.prototype.slice.call(document.querySelectorAll(".container"))[index].classList[0];
        activeClass = className
        setTimeout(() => {
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
    Array.prototype.slice.call(document.querySelectorAll('.btn')).forEach((el, btnIndex) => {
        index == btnIndex ? el.classList.add('btn-active') : el.classList.remove('btn-active');
    });
}

// allow arrow keys to switch tabs
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



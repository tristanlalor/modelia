let timer;
let clickHappening = false;
let activeClass = "fs";

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
let mouseOver = () => {
    console.log("Mouse Over");
    if (!event.relatedTarget.classList.contains('btn') && !event.relatedTarget.classList.contains('ghost') || !event.relatedTarget.classList.contains('.ham-icon') && !event.relatedTarget.classList.contains('ghost') || !event.relatedTarget.classList.contains('hamburger') && !event.relatedTarget.classList.contains('ghost')){
        timer = setTimeout(function(){
            if (!clickHappening) {
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
    // document.querySelector(".transition").classList.remove("peak-in");
    if (event.relatedTarget != document.querySelector(`.ghost`) && !event.relatedTarget.classList.contains('btn') && !event.relatedTarget.classList.contains('ham-icon') && !event.relatedTarget.classList.contains('.hamburger')) {
        clearTimeout(timer);
        if (!docked){
            if (!document.querySelector('.all-pages-container').classList.contains("scale")) {
                document.querySelector('.all-pages-container').classList.add("scale");
            }
        };
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

let toggleHamburger = (event) => {
    document.querySelector('.ham-icon').classList.toggle('hamburger-active')
};
let removeHamburger = (event) => {
    document.querySelector('.ham-icon').classList.remove('hamburger-active')
};
let addHamburger = (event) => {
    document.querySelector('.ham-icon').classList.add('hamburger-active')
};
// document.querySelector('.ham-icon').addEventListener('click', toggleHamburger);


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


// set up nav btns
Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
    let className;
    let colors = ["#a3927a", "#97a6a0", "#2a3436", "#37344a", "#3d2947"];

    //add mouseenter response
    el.addEventListener('mouseenter', mouseEnter);
    el.addEventListener('mouseenter', () => {
        // document.querySelector('.transition').style.backgroundColor = colors[index];
        // document.querySelector('.transition').style.backgroundColor = 'rgb(0,0,0)';
    });
    
    //add mouseout response
    el.addEventListener("mouseleave", mouseLeaveBtns);

    //add click response
    el.addEventListener('click', (event) => {
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

        docked = false;

        //do the transition
        // transition(); // old
        animateTransition();

        //if page is not yet full screen, go to full screen
        if (!document.querySelector('.all-pages-container').classList.contains("scale")) {
            document.querySelector('.all-pages-container').classList.add("scale");
        }

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
//set up full-screen btn
document.querySelector('.ham-icon').addEventListener('click', (event) => {
    (docked) ? docked = false : docked = true;
    if (!docked) {
        document.querySelector('.all-pages-container').classList.add("scale");
    }
    Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
        let ele = document.querySelector(`.btn-${index+1}`)
        ele.style.transform = `translateX(0px)`;
        ele.style.opacity = 0;
        ele.style.pointerEvents = 'none';
        document.querySelector(`.ghost`).style.transform = "scaleX(1)";
    });
});



// document.querySelector(".ham-icon .hamburger").addEventListener("mouseover", mouseOver);
document.querySelector(".hamburger").addEventListener("mouseover", mouseOver);
document.querySelector(".ham-icon").addEventListener("mouseover", mouseOver);
document.querySelector(".nav-btn").addEventListener("mouseover", mouseOver);
document.querySelector(".nav-btn").addEventListener("mouseleave", mouseLeaveBtns);
document.querySelector(".ghost").addEventListener("mouseleave", mouseLeaveBtns);



document.addEventListener("click", e => {
    console.log(e.target);
});



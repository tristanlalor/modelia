let timer;
let clickHappening = false;

let transition = () => {
    document.querySelector(".transition").classList.add("slide-in");
    setTimeout(() => {
        document.querySelector(".transition").classList.remove("slide-in");
    }, 400);
};

let mouseEnter = (color) => {
    if (!clickHappening) {
        document.querySelector(".transition").classList.add("peak-in");
    }
};

let mouseLeaveBtns = (event) => {
    clearTimeout(timer);
    document.querySelector(".transition").classList.remove("peak-in");
    if (event.relatedTarget != document.querySelector(`.ghost`) && !event.relatedTarget.classList.contains('btn') && !event.relatedTarget.classList.contains('full-screen-btn')) {
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
    }
}

// set up nav btns
Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
    let className;
    let colors = ["#a3927a", "#97a6a0", "#2a3436", "#37344a", "#3d2947"];

    //add mouseenter response
    el.addEventListener('mouseenter', mouseEnter);
    el.addEventListener('mouseenter', () => {
        document.querySelector('.transition').style.backgroundColor = colors[index];
        // document.querySelector('.transition').style.backgroundColor = 'rgb(0,0,0)';
    });
    
    //add mouseout response
    el.addEventListener("mouseleave", mouseLeaveBtns);

    //add click response
    el.addEventListener('click', (event) => {
        document.querySelector(".transition").classList.remove("peak-in");
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
        transition();

        //if page is not yet full screen, go to full screen
        if (!document.querySelector('.all-pages-container').classList.contains("scale")) {
            document.querySelector('.all-pages-container').classList.add("scale");
        }

        //create timer for when page is fully covered by transition (200ms)
        className = Array.prototype.slice.call(document.querySelectorAll(".container"))[index].classList[0];
        
        document.querySelector(`.${className}`).classList.add('active');
        setTimeout(() => {

            //remove active from all containers (hide them)
            Array.prototype.slice.call(document.querySelectorAll(".container")).forEach(el => {
                if (!el.classList.contains(className)) {
                    el.classList.remove('active');
                }
            });

            //set the class of the corresponding html tab that the button corresponds with
            // className = Array.prototype.slice.call(document.querySelectorAll(".container"))[index].classList[0];

            // //add active to selected element
            // document.querySelector(`.${className}`).classList.add('active');
        }, 200);
    });
});
let docked = false;
//set up full-screen btn
document.querySelector('.full-screen-btn').addEventListener('click', (event) => {
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

document.querySelector(".nav-btn").addEventListener("mouseover", event => {
    if (!event.relatedTarget.classList.contains('btn') && !event.relatedTarget.classList.contains('ghost')){
        timer = setTimeout(function(){
            if (!clickHappening) {
                if (document.querySelector('.all-pages-container').classList.contains("scale")) {
                    document.querySelector('.all-pages-container').classList.remove("scale");
                };
                Array.prototype.slice.call(document.querySelectorAll(".btn")).forEach((el, index) => {
                    let scaleFactor = (index+1) * 55;
                    let ele = document.querySelector(`.btn-${index+1}`);
                    ele.style.transform = `translateX(${scaleFactor}px)`;
                    ele.style.opacity = 1;
                    ele.style.pointerEvents = 'auto';
                    document.querySelector(`.ghost`).style.transform = "scaleX(6.2)";
                });
            }
        }, 310);
    }
});
document.querySelector(".nav-btn").addEventListener("mouseleave", mouseLeaveBtns);
document.querySelector(".ghost").addEventListener("mouseleave", mouseLeaveBtns);



document.addEventListener("click", e => {
    console.log(e.target);
});



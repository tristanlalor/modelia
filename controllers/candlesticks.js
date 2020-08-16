import * as graphlib from '/graphs.js';
import * as fs from '/fs.js';

export const setNumDays = (numDays) => {
    if (numDays) {
        document.querySelector('#numDays').placeholder = "Days: " + numDays;
    } else {
        numDays = document.querySelector('#numDays') ? parseInt(document.querySelector('#numDays').value) : 100;
    }
    return numDays;
}
let numDays = setNumDays();

const drawChart = (numDays) => {
    const markup = `
    <style>
        #candlestick * {
            transition: 0s;
        }
        #candlestick {
            width: 100%;
            height: 100%;
            /* border: solid black 3px; */
        }
    </style>
    
    <!-- Resources -->
    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
    
    
    
    <!-- HTML -->
    <div class="table-tools">
        <img class="search-icon" id="search" src="img/columns.svg" style="height: 22px;" onclick="document.getElementById('numDays').focus();"></img>
        <input id="numDays" placeholder="${isNaN(numDays) ? "Invalid: Enter a Number" : `Days: ${numDays}`}" type="text"></input>
    </div>
    <div class="candlestick-content">
        <div id="candlestick"></div>
    </div>
    `;
    document.querySelector('.variable-content').innerHTML = markup;
    graphlib.createCandlestickChart(numDays);
}

const changeDays = () => {
    document.querySelector('#numDays').removeEventListener('change', changeDays);
    //dispose of chart!!!!!
    numDays = setNumDays();
    drawChart(numDays);
    document.querySelector('#numDays').addEventListener('change', changeDays);
}

document.querySelector('.candlestick-btn').addEventListener('click', () => {
    if (!document.querySelector('.candlestick-btn').classList.contains('selected')) {
        fs.autoCollapseOnMobile();
        drawChart(numDays);
        document.querySelector('#numDays').addEventListener('change', changeDays);
    }
});
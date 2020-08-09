import * as graphlib from '/graphs.js';

let numDays = document.querySelector('#numDays') ? parseInt(document.querySelector('#numDays').value) : 100;



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
<input type="text" id="numDays">
<div class="candlestick-content">
    <div id="candlestick"></div>
</div>
`;

const changeDays = () => {
    document.querySelector('#numDays').removeEventListener('change', changeDays);
    //dispose of chart!!!!!
    numDays = document.querySelector('#numDays').value;
    document.querySelector('.variable-content').innerHTML = markup;
    document.querySelector('#numDays').value = numDays;
    graphlib.createCandlestickChart(numDays);
    document.querySelector('#numDays').addEventListener('change', changeDays);
}

document.querySelector('.candlestick-btn').addEventListener('click', () => {
    document.querySelector('.variable-content').innerHTML = markup;
    graphlib.createCandlestickChart(numDays);
    document.querySelector('#numDays').addEventListener('change', changeDays);
});
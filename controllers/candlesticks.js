import * as graphlib from '/graphs.js';

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
<div class="candlestick-content">
    <div id="candlestick"></div>
</div>
`;

document.querySelector('.candlestick-btn').addEventListener('click', () => {
    document.querySelector('.variable-content').innerHTML = markup;
    graphlib.createCandlestickChart();
});
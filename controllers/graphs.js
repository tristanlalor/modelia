// Pie Chart #####################################################################################################################################################################################################################################################################################

am4core.useTheme(am4themes_animated);

// Create chart instance
var chart = am4core.create("piechartdiv", am4charts.PieChart);

// Add data
chart.data = [{
    "country": "Lithuania",
    "litres": 501.9
    }, {
    "country": "Czechia",
    "litres": 301.9
    }, {
    "country": "Ireland",
    "litres": 201.1
    }, {
    "country": "Germany",
    "litres": 165.8
    }, {
    "country": "Australia",
    "litres": 139.9
    }, {
    "country": "Austria",
    "litres": 128.3
    }, {
    "country": "UK",
    "litres": 99
    }, {
    "country": "Belgium",
    "litres": 60
    }, {
    "country": "The Netherlands",
    "litres": 50
}];

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.labels.template.disabled = true;

    chart.radius = am4core.percent(95);

    // Create custom legend
    chart.events.on("ready", function(event) {
    // populate our custom legend when chart renders
    chart.customLegend = document.getElementById('piechartlegend');
    pieSeries.dataItems.each(function(row, i) {
        var color = chart.colors.getIndex(i);
        var percent = Math.round(row.values.value.percent * 100) / 100;
        var value = row.value;
        document.getElementById('piechartlegend').innerHTML += '<div class="legend-item" id="legend-item-' + i + '" onclick="toggleSlice(' + i + ');" onmouseover="hoverSlice(' + i + ');" onmouseout="blurSlice(' + i + ');" style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' + row.category + '<div class="legend-value">' + value + ' | ' + percent + '%</div></div>';
    });
});

function toggleSlice(item) {
    var slice = pieSeries.dataItems.getIndex(item);
    if (slice.visible) {
        slice.hide();
    }
    else {
        slice.show();
    }
}

function hoverSlice(item) {
    var slice = pieSeries.slices.getIndex(item);
    slice.isHover = true;
}

function blurSlice(item) {
    var slice = pieSeries.slices.getIndex(item);
    slice.isHover = false;
}


// Operating Performance Chart (opchart)#####################################################################################################################################################################################################################################################################################
export const createOpChart = () => {
    am4core.useTheme(am4themes_animated);
    
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    
    var data = [];
    var open = 100;
    var close = 250;
    var difference = close - open;
    
    for (var i = 1; i < 120; i++) {
      open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
      close = Math.round(open + Math.random() * 5 + i / 5 - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2);
      difference = close - open;
      data.push({ date: new Date(2018, 0, i), open: open, close: close, difference: difference });
    }
    
    chart.data = data;
    
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.grid.template.stroke = "#FFF";
    valueAxis.renderer.grid.template.strokeDasharray = "3,3";
    dateAxis.renderer.grid.template.disabled = true;
    // dateAxis.renderer.grid.template.fill = am4core.color("#FFF");
    // dateAxis.textColor = am4core.color("#FFF");
    dateAxis.renderer.labels.template.fill = am4core.color("#FFF");
    
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.openValueY = "open";
    series.dataFields.valueY = "close";
    series.dataFields.customValue = "difference";
    
    
    
    
    // series.tooltipText.adapter.add("text", function(text) {
    //     return text + "%";
    //   });
    series.tooltipText = "Revenue: {openValueY.value} Costs: {valueY.value} profit: {customValue.value}";
    series.sequencedInterpolation = true;
    series.fillOpacity = 0.3;
    series.defaultState.transitionDuration = 500;
    series.tensionX = 0.8;
    
    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "open";
    series2.sequencedInterpolation = true;
    series2.defaultState.transitionDuration = 500;
    series2.stroke = chart.colors.getIndex(6);
    series2.tensionX = 0.8;
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.lineX.stroke = am4core.color("#FFF");
    chart.cursor.lineY.stroke = am4core.color("#FFF");

}
createOpChart();

// end ##################################################################################################################################################################################














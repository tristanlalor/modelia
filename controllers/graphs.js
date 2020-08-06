
const getChartByContainerId = (id) => {
  var charts = am4core.registry.baseSprites[i];
  for(var i = 0; i < charts.length; i++) {
    if (charts[i].svgContainer.id == id) {
      return charts[i];
    }
  }
}
const chartDisposalService = (chart) => {
  document.querySelectorAll('.fs-nav-item').forEach
  Array.prototype.slice.call(document.querySelectorAll(".fs-nav-item")).forEach((el, index) => {
    el.addEventListener('click', () => {
      chart.dispose();
    });
  });
}

{
  // Pie Chart #####################################################################################################################################################################################################################################################################################
  
  // am4core.useTheme(am4themes_animated);
  
  // // Create chart instance
  // var chart = am4core.create("piechartdiv", am4charts.PieChart);
  
  // // Add data
  // chart.data = [{
  //     "country": "Lithuania",
  //     "litres": 501.9
  //     }, {
  //     "country": "Czechia",
  //     "litres": 301.9
  //     }, {
  //     "country": "Ireland",
  //     "litres": 201.1
  //     }, {
  //     "country": "Germany",
  //     "litres": 165.8
  //     }, {
  //     "country": "Australia",
  //     "litres": 139.9
  //     }, {
  //     "country": "Austria",
  //     "litres": 128.3
  //     }, {
  //     "country": "UK",
  //     "litres": 99
  //     }, {
  //     "country": "Belgium",
  //     "litres": 60
  //     }, {
  //     "country": "The Netherlands",
  //     "litres": 50
  // }];
  
  // // Add and configure Series
  // var pieSeries = chart.series.push(new am4charts.PieSeries());
  //     pieSeries.dataFields.value = "litres";
  //     pieSeries.dataFields.category = "country";
  //     pieSeries.labels.template.disabled = true;
  
  //     chart.radius = am4core.percent(95);
  
  //     // Create custom legend
  //     chart.events.on("ready", function(event) {
  //     // populate our custom legend when chart renders
  //     chart.customLegend = document.getElementById('piechartlegend');
  //     pieSeries.dataItems.each(function(row, i) {
  //         var color = chart.colors.getIndex(i);
  //         var percent = Math.round(row.values.value.percent * 100) / 100;
  //         var value = row.value;
  //         document.getElementById('piechartlegend').innerHTML += '<div class="legend-item" id="legend-item-' + i + '" onclick="toggleSlice(' + i + ');" onmouseover="hoverSlice(' + i + ');" onmouseout="blurSlice(' + i + ');" style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' + row.category + '<div class="legend-value">' + value + ' | ' + percent + '%</div></div>';
  //     });
  // });
  
  // function toggleSlice(item) {
  //     var slice = pieSeries.dataItems.getIndex(item);
  //     if (slice.visible) {
  //         slice.hide();
  //     }
  //     else {
  //         slice.show();
  //     }
  // }
  
  // function hoverSlice(item) {
  //     var slice = pieSeries.slices.getIndex(item);
  //     slice.isHover = true;
  // }
  
  // function blurSlice(item) {
  //     var slice = pieSeries.slices.getIndex(item);
  //     slice.isHover = false;
  // }
}

// Operating Performance Chart (opchart)#########################################################################
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
    valueAxis.renderer.grid.template.stroke = "#2C2B2B";
    valueAxis.renderer.grid.template.strokeDasharray = "3,3";
    dateAxis.renderer.grid.template.disabled = true;
    // dateAxis.renderer.grid.template.fill = am4core.color("#FFF");
    // dateAxis.textColor = am4core.color("#FFF");
    dateAxis.renderer.labels.template.fill = am4core.color("#2C2B2B");
    
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
    chart.cursor.lineX.stroke = am4core.color("#2C2B2B");
    chart.cursor.lineY.stroke = am4core.color("#2C2B2B");

    //add event listener to dispose of chart
    chartDisposalService(chart);
}
createOpChart();



// Price Chart #########################################################################
export const createPriceChart = () => {
  am4core.ready(function() {
    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart
    var chart = am4core.create("pricechart", am4charts.XYChart);
    chart.padding(0, 15, 0, 15);
    
    // Load external data
    chart.dataSource.url = "https://www.amcharts.com/wp-content/uploads/assets/stock/MSFT.csv";
    chart.dataSource.parser = new am4core.CSVParser();
    chart.dataSource.parser.options.useColumnNames = true;
    chart.dataSource.parser.options.reverse = true;
    
    // the following line makes value axes to be arranged vertically.
    chart.leftAxesContainer.layout = "vertical";
    
    // uncomment this line if you want to change order of axes
    //chart.bottomAxesContainer.reverseOrder = true;
    
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.ticks.template.length = 8;
    dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.ticks.template.disabled = false;
    dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
    dateAxis.renderer.minLabelPosition = 0.01;
    dateAxis.renderer.maxLabelPosition = 0.99;
    dateAxis.keepSelection = true;
    dateAxis.minHeight = 30;
    
    dateAxis.groupData = true;
    dateAxis.minZoomCount = 5;
    
    // these two lines makes the axis to be initially zoomed-in
    // dateAxis.start = 0.7;
    // dateAxis.keepSelection = true;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.zIndex = 1;
    valueAxis.renderer.baseGrid.disabled = true;
    // height of axis
    valueAxis.height = am4core.percent(65);
    
    valueAxis.renderer.gridContainer.background.fill = am4core.color("#000000");
    valueAxis.renderer.gridContainer.background.fillOpacity = 0.05;
    valueAxis.renderer.inside = true;
    valueAxis.renderer.labels.template.verticalCenter = "bottom";
    valueAxis.renderer.labels.template.padding(2, 2, 2, 2);
    
    //valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis.renderer.fontSize = "0.8em"
    
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "Date";
    series.dataFields.valueY = "Adj Close";
    series.tooltipText = "{valueY.value}";
    series.name = "MSFT: Value";
    series.defaultState.transitionDuration = 0;
    
    var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    // height of axis
    valueAxis2.height = am4core.percent(35);
    valueAxis2.zIndex = 3
    // this makes gap between panels
    valueAxis2.marginTop = 30;
    valueAxis2.renderer.baseGrid.disabled = true;
    valueAxis2.renderer.inside = true;
    valueAxis2.renderer.labels.template.verticalCenter = "bottom";
    valueAxis2.renderer.labels.template.padding(2, 2, 2, 2);
    //valueAxis.renderer.maxLabelPosition = 0.95;
    valueAxis2.renderer.fontSize = "0.8em"
    
    valueAxis2.renderer.gridContainer.background.fill = am4core.color("#000000");
    valueAxis2.renderer.gridContainer.background.fillOpacity = 0.05;
    
    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.dateX = "Date";
    series2.dataFields.valueY = "Volume";
    series2.yAxis = valueAxis2;
    series2.tooltipText = "{valueY.value}";
    series2.name = "MSFT: Volume";
    // volume should be summed
    series2.groupFields.valueY = "sum";
    series2.defaultState.transitionDuration = 0;
    
    chart.cursor = new am4charts.XYCursor();
    
    var scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    scrollbarX.marginBottom = 20;
    scrollbarX.scrollbarChart.xAxes.getIndex(0).minHeight = undefined;
    chart.scrollbarX = scrollbarX;
    
    
    // Add range selector
    var selector = new am4plugins_rangeSelector.DateAxisRangeSelector();
    selector.container = document.getElementById("controls");
    selector.axis = dateAxis;
    
    //add event listener to dispose of chart
    chartDisposalService(chart);
    }); // end am4core.ready()
}
createPriceChart();

// Candlestick Chart #########################################################################
export const createCandlestickChart = () => {
  am4core.ready(function() {
                                    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("candlestick", am4charts.XYChart);
    // chart.paddingRight = 20;
    
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
    
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    
    var series = chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
    series.dataFields.openValueY = "open";
    series.dataFields.lowValueY = "low";
    series.dataFields.highValueY = "high";
    series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";
    
    // important!
    // candlestick series colors are set in states. 
    // series.riseFromOpenState.properties.fill = am4core.color("#00ff00");
    // series.dropFromOpenState.properties.fill = am4core.color("#FF0000");
    // series.riseFromOpenState.properties.stroke = am4core.color("#00ff00");
    // series.dropFromOpenState.properties.stroke = am4core.color("#FF0000");
    
    series.riseFromPreviousState.properties.fillOpacity = 1;
    series.dropFromPreviousState.properties.fillOpacity = 0;
    
    chart.cursor = new am4charts.XYCursor();
    
    // a separate series for scrollbar
    var lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = "date";
    lineSeries.dataFields.valueY = "close";
    // need to set on default state, as initially series is "show"
    lineSeries.defaultState.properties.visible = false;
    
    // hide from legend too (in case there is one)
    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;
    
    var scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(lineSeries);
    chart.scrollbarX = scrollbarX;
    
    chart.data = [ {
        "date": "2011-08-01",
        "open": "136.65",
        "high": "136.96",
        "low": "134.15",
        "close": "136.49"
      }, {
        "date": "2011-08-02",
        "open": "135.26",
        "high": "135.95",
        "low": "131.50",
        "close": "131.85"
      }, {
        "date": "2011-08-05",
        "open": "132.90",
        "high": "135.27",
        "low": "128.30",
        "close": "135.25"
      }, {
        "date": "2011-08-06",
        "open": "134.94",
        "high": "137.24",
        "low": "132.63",
        "close": "135.03"
      }, {
        "date": "2011-08-07",
        "open": "136.76",
        "high": "136.86",
        "low": "132.00",
        "close": "134.01"
      }, {
        "date": "2011-08-08",
        "open": "131.11",
        "high": "133.00",
        "low": "125.09",
        "close": "126.39"
      }, {
        "date": "2011-08-09",
        "open": "123.12",
        "high": "127.75",
        "low": "120.30",
        "close": "125.00"
      }, {
        "date": "2011-08-12",
        "open": "128.32",
        "high": "129.35",
        "low": "126.50",
        "close": "127.79"
      }, {
        "date": "2011-08-13",
        "open": "128.29",
        "high": "128.30",
        "low": "123.71",
        "close": "124.03"
      }, {
        "date": "2011-08-14",
        "open": "122.74",
        "high": "124.86",
        "low": "119.65",
        "close": "119.90"
      }, {
        "date": "2011-08-15",
        "open": "117.01",
        "high": "118.50",
        "low": "111.62",
        "close": "117.05"
      }, {
        "date": "2011-08-16",
        "open": "122.01",
        "high": "123.50",
        "low": "119.82",
        "close": "122.06"
      }, {
        "date": "2011-08-19",
        "open": "123.96",
        "high": "124.50",
        "low": "120.50",
        "close": "122.22"
      }, {
        "date": "2011-08-20",
        "open": "122.21",
        "high": "128.96",
        "low": "121.00",
        "close": "127.57"
      }, {
        "date": "2011-08-21",
        "open": "131.22",
        "high": "132.75",
        "low": "130.33",
        "close": "132.51"
      }, {
        "date": "2011-08-22",
        "open": "133.09",
        "high": "133.34",
        "low": "129.76",
        "close": "131.07"
      }, {
        "date": "2011-08-23",
        "open": "130.53",
        "high": "135.37",
        "low": "129.81",
        "close": "135.30"
      }, {
        "date": "2011-08-26",
        "open": "133.39",
        "high": "134.66",
        "low": "132.10",
        "close": "132.25"
      }, {
        "date": "2011-08-27",
        "open": "130.99",
        "high": "132.41",
        "low": "126.63",
        "close": "126.82"
      }, {
        "date": "2011-08-28",
        "open": "129.88",
        "high": "134.18",
        "low": "129.54",
        "close": "134.08"
      }, {
        "date": "2011-08-29",
        "open": "132.67",
        "high": "138.25",
        "low": "132.30",
        "close": "136.25"
      }, {
        "date": "2011-08-30",
        "open": "139.49",
        "high": "139.65",
        "low": "137.41",
        "close": "138.48"
      }, {
        "date": "2011-09-03",
        "open": "139.94",
        "high": "145.73",
        "low": "139.84",
        "close": "144.16"
      }, {
        "date": "2011-09-04",
        "open": "144.97",
        "high": "145.84",
        "low": "136.10",
        "close": "136.76"
      }, {
        "date": "2011-09-05",
        "open": "135.56",
        "high": "137.57",
        "low": "132.71",
        "close": "135.01"
      }, {
        "date": "2011-09-06",
        "open": "132.01",
        "high": "132.30",
        "low": "130.00",
        "close": "131.77"
      }, {
        "date": "2011-09-09",
        "open": "136.99",
        "high": "138.04",
        "low": "133.95",
        "close": "136.71"
      }, {
        "date": "2011-09-10",
        "open": "137.90",
        "high": "138.30",
        "low": "133.75",
        "close": "135.49"
      }, {
        "date": "2011-09-11",
        "open": "135.99",
        "high": "139.40",
        "low": "135.75",
        "close": "136.85"
      }, {
        "date": "2011-09-12",
        "open": "138.83",
        "high": "139.00",
        "low": "136.65",
        "close": "137.20"
      }, {
        "date": "2011-09-13",
        "open": "136.57",
        "high": "138.98",
        "low": "136.20",
        "close": "138.81"
      }, {
        "date": "2011-09-16",
        "open": "138.99",
        "high": "140.59",
        "low": "137.60",
        "close": "138.41"
      }, {
        "date": "2011-09-17",
        "open": "139.06",
        "high": "142.85",
        "low": "137.83",
        "close": "140.92"
      }, {
        "date": "2011-09-18",
        "open": "143.02",
        "high": "143.16",
        "low": "139.40",
        "close": "140.77"
      }, {
        "date": "2011-09-19",
        "open": "140.15",
        "high": "141.79",
        "low": "139.32",
        "close": "140.31"
      }, {
        "date": "2011-09-20",
        "open": "141.14",
        "high": "144.65",
        "low": "140.31",
        "close": "144.15"
      }, {
        "date": "2011-09-23",
        "open": "146.73",
        "high": "149.85",
        "low": "146.65",
        "close": "148.28"
      }, {
        "date": "2011-09-24",
        "open": "146.84",
        "high": "153.22",
        "low": "146.82",
        "close": "153.18"
      }, {
        "date": "2011-09-25",
        "open": "154.47",
        "high": "155.00",
        "low": "151.25",
        "close": "152.77"
      }, {
        "date": "2011-09-26",
        "open": "153.77",
        "high": "154.52",
        "low": "152.32",
        "close": "154.50"
      }, {
        "date": "2011-09-27",
        "open": "153.44",
        "high": "154.60",
        "low": "152.75",
        "close": "153.47"
      }, {
        "date": "2011-09-30",
        "open": "154.63",
        "high": "157.41",
        "low": "152.93",
        "close": "156.34"
      }, {
        "date": "2011-10-01",
        "open": "156.55",
        "high": "158.59",
        "low": "155.89",
        "close": "158.45"
      }, {
        "date": "2011-10-02",
        "open": "157.78",
        "high": "159.18",
        "low": "157.01",
        "close": "157.92"
      }, {
        "date": "2011-10-03",
        "open": "158.00",
        "high": "158.08",
        "low": "153.50",
        "close": "156.24"
      }, {
        "date": "2011-10-04",
        "open": "158.37",
        "high": "161.58",
        "low": "157.70",
        "close": "161.45"
      }, {
        "date": "2011-10-07",
        "open": "163.49",
        "high": "167.91",
        "low": "162.97",
        "close": "167.91"
      }, {
        "date": "2011-10-08",
        "open": "170.20",
        "high": "171.11",
        "low": "166.68",
        "close": "167.86"
      }, {
        "date": "2011-10-09",
        "open": "167.55",
        "high": "167.88",
        "low": "165.60",
        "close": "166.79"
      }, {
        "date": "2011-10-10",
        "open": "169.49",
        "high": "171.88",
        "low": "153.21",
        "close": "162.23"
      }, {
        "date": "2011-10-11",
        "open": "163.01",
        "high": "167.28",
        "low": "161.80",
        "close": "167.25"
      }, {
        "date": "2011-10-14",
        "open": "167.98",
        "high": "169.57",
        "low": "163.50",
        "close": "166.98"
      }, {
        "date": "2011-10-15",
        "open": "165.54",
        "high": "170.18",
        "low": "165.15",
        "close": "169.58"
      }, {
        "date": "2011-10-16",
        "open": "172.69",
        "high": "173.04",
        "low": "169.18",
        "close": "172.75"
      }];
    

      //add event listener to dispose of chart
      chartDisposalService(chart);
    }); // end am4core.ready()

}
createCandlestickChart();















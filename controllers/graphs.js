import * as APIHandler from '/apiHandler.js';
import * as candlesticks from '/candlesticks.js';
import * as summary from '/summary.js';


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

//[{date, open, close, difference}]
//(date, cogs, revenue, profit)
// Operating Performance Chart (opchart)#########################################################################
export const createOpChart = async () => {
    am4core.useTheme(am4themes_animated);
    
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    
    // var data = [];
    // var open = 100;
    // var close = 250;
    // var difference = close - open;
    
    // for (var i = 1; i < 120; i++) {
    //   open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4);
    //   close = Math.round(open + Math.random() * 5 + i / 5 - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2);
    //   difference = close - open;
    //   data.push({ date: new Date(2018, 0, i), open: open, close: close, difference: difference });
    // }
    
    // chart.data = data;


    let symbol = localStorage.getItem("symbol");
    let isDataQuarterly;
    if (localStorage.getItem("isDataQuarterly") == null) {
      console.log("fetching priceData and storing in localStorage");
      isDataQuarterly = await APIHandler.generalFetch("income-statement", symbol, "period=quarter");
      localStorage.setItem("isDataQuarterly", JSON.stringify(isDataQuarterly));
      // data = isDataQuarterly['historical'].reverse();
      console.log(isDataQuarterly);
  } else {
      console.log("retrieving priceData from localStorage");
      isDataQuarterly = JSON.parse(localStorage.getItem("isDataQuarterly"));
      // data = isDataQuarterly['historical'].reverse();
      console.log(isDataQuarterly);
  }
  // [{date, open, close, difference}]
  let data = [];
  isDataQuarterly.forEach((el, index, array) => {
    let grossProfit = el.revenue - el.costOfRevenue;
    // data[index] = {el.date, el.revenue, el.costOfRevenue, grossProfit};    
    let period = el.period == "FY" ? "Q4" : el.period;
    data.push({ date: el.date, open: el.revenue, close: el.costOfRevenue, difference: grossProfit, period: period});                                            
  });

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
    series.dataFields.period = "period";
    
    
    chart.numberFormatter.numberFormat = "#.0a";
    chart.numberFormatter.bigNumberPrefixes = [
      { "number": 1e+3, "suffix": "K" },
      { "number": 1e+6, "suffix": "M" },
      { "number": 1e+9, "suffix": "B" },
      { "number": 1e+12, "suffix": "T" }
    ];
    
    // series.tooltipText.adapter.add("text", function(text) {
    //     return text + "%";
    //   });
    series.tooltipText = "[bold]{period}[/]\nRevenue: ${openValueY.value}\nCost of Revenue: ${valueY.value}\nGross Profit: ${customValue.value}";
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
    var axisTooltip = dateAxis.tooltip;
    dateAxis.tooltipDateFormat = "MMM yyyy";
    // dateAxis.tooltipText = "{dateX.value} {period.value}";
    // dateAxis.adapter.add("getTooltipText", () => {
    //   return ">>>" + series.dataFields.period + text + " <<<";
    //  });

    chart.cursor.lineX.stroke = am4core.color("#2C2B2B");
    chart.cursor.lineY.stroke = am4core.color("#2C2B2B");

    //add event listener to dispose of chart
    chartDisposalService(chart);
}
// createOpChart();

export const createPriceChart = () => {
  am4core.ready(async function() {
    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart
    var chart = am4core.create("pricechart", am4charts.XYChart);
    chart.padding(0, 15, 0, 15);
    

    let data;
    let symbol = localStorage.getItem("symbol");
    if (localStorage.getItem("priceData") == null) {
      console.log("fetching priceData and storing in localStorage");
      let priceData = await APIHandler.generalFetch("historical-price-full", symbol);
      localStorage.setItem("priceData", JSON.stringify(priceData));
      data = priceData['historical'].reverse();
      console.log(priceData);
  } else {
      console.log("retrieving priceData from localStorage");
      let priceData = JSON.parse(localStorage.getItem("priceData"));
      data = priceData['historical'].reverse();
      console.log(priceData);
  }
    chart.data = data;

    // Load external data
    // chart.dataSource.url = "https://www.amcharts.com/wp-content/uploads/assets/stock/MSFT.csv";
    // chart.dataSource.parser = new am4core.CSVParser();
    // chart.dataSource.parser.options.useColumnNames = true;
    // chart.dataSource.parser.options.reverse = true;
    // console.log(chart.dataSource);

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
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "close";
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
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "volume";
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
// createPriceChart();


// [{date, open, high, low, close}]
// Candlestick Chart #########################################################################
export const createCandlestickChart = (numDays) => {
  am4core.ready(async function() {
                                    
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
    
    // [{date, open, high, low, close}]
      let data;
      let symbol = localStorage.getItem("symbol");
      if (localStorage.getItem("priceData") == null) {
        console.log("fetching priceData and storing in localStorage");
        let priceData = await APIHandler.generalFetch("historical-price-full", symbol);
        localStorage.setItem("priceData", JSON.stringify(priceData));
        data = priceData['historical'].reverse();
        console.log(priceData);
    } else {
        console.log("retrieving priceData from localStorage");
        let priceData = JSON.parse(localStorage.getItem("priceData"));
        data = priceData['historical'].reverse();
        console.log(priceData);
    }
      if (numDays > data.length) {
        numDays = data.length;
        candlesticks.setNumDays(numDays);
      }
      chart.data = data.slice(-numDays);
    

      //add event listener to dispose of chart
      chartDisposalService(chart);
    }); // end am4core.ready()

}
// createCandlestickChart(100);















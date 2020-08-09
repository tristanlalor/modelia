// API
//######################################################################################################
let apiCallTest = async () => {
    // const result = await fetch("https://financialmodelingprep.com/api/v3/income-statement/TSLA?apikey=fe92325136d390238534104e6c91668f");
    // const data = await result.json();
    // console.log(data)
    // for (var prop in data['0']) {
    //     if (Object.prototype.hasOwnProperty.call(data['0'], prop)) {
    //         // do stuff
    //         console.log(prop);
    //     }
    // }

    //price data
    // const result = await fetch("https://financialmodelingprep.com/api/v3/historical-price-full/TSLA?apikey=fe92325136d390238534104e6c91668f");
    // const data = await result.json();
    // console.log(data);
    
    // key metrics
    // const result = await fetch("https://financialmodelingprep.com/api/v3/key-metrics/TSLA?apikey=fe92325136d390238534104e6c91668f");
    // const data = await result.json();
    // console.log(data);



  //   const result = await fetch("https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL/income-statement", {
	// "method": "GET",
	// "headers": {
	// 	"x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
	// 	"x-rapidapi-key": "722436d3b0msh92e54b02280f45fp1be6abjsnfdea59440cad"
	//     }
  //   });
  //   const data = await result.json();
  //   console.log(data);
  //   for (var prop in data['incomeStatementHistory']['incomeStatementHistory']['0']) {
  //       if (Object.prototype.hasOwnProperty.call(data['incomeStatementHistory']['incomeStatementHistory']['0'], prop)) {
  //           // do stuff
  //           console.log(prop);
  //       }
  //   }
}
apiCallTest();


const apiKey = "fe92325136d390238534104e6c91668f";

export const generalFetch = async (dataset, ticker) => {
  try {
    const result = await fetch(`https://financialmodelingprep.com/api/v3/${dataset}/${ticker}?apikey=${apiKey}`);
    const data = await result.json();
    return data;
  } catch (error){
    console.log(`SERVER ERROR: ${error}`);
  }
}

export const fetchSearchResults = async (query) => {
  const result = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${apiKey}`);
  const data = await result.json();
  console.log("logging query results");
  console.log(data);
  return data;
}

export const fetchPrice = async (ticker) => {
    // price data
    let dataset = "historical-price-full";
    const data = await generalFetch(dataset, ticker);
    console.log(data);
    return data;
}

export const fetchIS = async (ticker) => {
    // price data
    let dataset = "income-statement";
    const data = await generalFetch(dataset, ticker);
    console.log(data);
    return data;
}

export const sampleData = [
    {
      "date": "2019-12-31",
      "symbol": "TSLA",
      "fillingDate": "2020-02-13",
      "acceptedDate": "2020-02-13 07:12:18",
      "period": "FY",
      "revenue": 24578000000,
      "costOfRevenue": 20509000000,
      "grossProfit": 4069000000,
      "grossProfitRatio": 0.16555456099,
      "researchAndDevelopmentExpenses": 1343000000,
      "generalAndAdministrativeExpenses": 2646000000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": 149000000,
      "operatingExpenses": 4138000000,
      "costAndExpenses": 24647000000,
      "interestExpense": 685000000,
      "depreciationAndAmortization": 2342000000,
      "ebitda": 2273000000,
      "ebitdaratio": 0.0924810806412,
      "operatingIncome": -69000000,
      "operatingIncomeRatio": -0.00280738872162,
      "totalOtherIncomeExpensesNet": 45000000,
      "incomeBeforeTax": -665000000,
      "incomeBeforeTaxRatio": -0.0270567173895,
      "incomeTaxExpense": 110000000,
      "netIncome": -862000000,
      "netIncomeRatio": -0.0350720156237,
      "eps": -4.92,
      "epsdiluted": -4.92,
      "weightedAverageShsOut": 183000000,
      "weightedAverageShsOutDil": 199000000,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000156459020004475/0001564590-20-004475-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000156459020004475/tsla-10k_20191231.htm"
    },
    {
      "date": "2018-12-31",
      "symbol": "TSLA",
      "fillingDate": "2019-02-19",
      "acceptedDate": "2019-02-19 06:10:16",
      "period": "FY",
      "revenue": 21461268000,
      "costOfRevenue": 17419247000,
      "grossProfit": 4042021000,
      "grossProfitRatio": 0.18834026955,
      "researchAndDevelopmentExpenses": 1460370000,
      "generalAndAdministrativeExpenses": 2834491000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": 135233000,
      "operatingExpenses": 4430094000,
      "costAndExpenses": 21849341000,
      "interestExpense": 663071000,
      "depreciationAndAmortization": 2059780000,
      "ebitda": 1671707000,
      "ebitdaratio": 0.0778941393398,
      "operatingIncome": -388073000,
      "operatingIncomeRatio": -0.0180824823585,
      "totalOtherIncomeExpensesNet": 21866000,
      "incomeBeforeTax": -1004745000,
      "incomeBeforeTaxRatio": -0.0468166652595,
      "incomeTaxExpense": 57837000,
      "netIncome": -976091000,
      "netIncomeRatio": -0.0454815158172,
      "eps": -5.72,
      "epsdiluted": -5.72,
      "weightedAverageShsOut": 170525000,
      "weightedAverageShsOutDil": 170525000,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000156459019003165/0001564590-19-003165-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000156459019003165/tsla-10k_20181231.htm"
    },
    {
      "date": "2017-12-31",
      "symbol": "TSLA",
      "fillingDate": "2018-02-23",
      "acceptedDate": "2018-02-23 06:07:43",
      "period": "FY",
      "revenue": 11758751000,
      "costOfRevenue": 9536264000,
      "grossProfit": 2222487000,
      "grossProfitRatio": 0.18900706376,
      "researchAndDevelopmentExpenses": 1378073000,
      "generalAndAdministrativeExpenses": 2476500000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": -125373000,
      "operatingExpenses": 3854573000,
      "costAndExpenses": 13390837000,
      "interestExpense": 471259000,
      "depreciationAndAmortization": 1727040000,
      "ebitda": 94954000,
      "ebitdaratio": 0.00807517737215,
      "operatingIncome": -1632086000,
      "operatingIncomeRatio": -0.138797564469,
      "totalOtherIncomeExpensesNet": -125373000,
      "incomeBeforeTax": -2209032000,
      "incomeBeforeTaxRatio": -0.187862809579,
      "incomeTaxExpense": 31546000,
      "netIncome": -1961400000,
      "netIncomeRatio": -0.166803430058,
      "eps": -11.83,
      "epsdiluted": -11.83,
      "weightedAverageShsOut": 165758000,
      "weightedAverageShsOutDil": 165758000,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000156459018002956/0001564590-18-002956-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000156459018002956/tsla-10k_20171231.htm"
    },
    {
      "date": "2016-12-31",
      "symbol": "TSLA",
      "fillingDate": "2017-03-01",
      "acceptedDate": "2017-03-01 16:54:21",
      "period": "FY",
      "revenue": 7000132000,
      "costOfRevenue": 5400875000,
      "grossProfit": 1599257000,
      "grossProfitRatio": 0.228460977593,
      "researchAndDevelopmentExpenses": 834408000,
      "generalAndAdministrativeExpenses": 1432189000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": 111272000,
      "operatingExpenses": 2266597000,
      "costAndExpenses": 7667472000,
      "interestExpense": 198810000,
      "depreciationAndAmortization": 1034385000,
      "ebitda": 367045000,
      "ebitdaratio": 0.0524340112444,
      "operatingIncome": -667340000,
      "operatingIncomeRatio": -0.0953324880159,
      "totalOtherIncomeExpensesNet": 111272000,
      "incomeBeforeTax": -746348000,
      "incomeBeforeTaxRatio": -0.106619132325,
      "incomeTaxExpense": 26698000,
      "netIncome": -674914000,
      "netIncomeRatio": -0.0964144676129,
      "eps": -4.68,
      "epsdiluted": -4.68,
      "weightedAverageShsOut": 164897000,
      "weightedAverageShsOutDil": 144212000,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000156459017003118/0001564590-17-003118-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000156459017003118/tsla-10k_20161231.htm"
    },
    {
      "date": "2015-12-31",
      "symbol": "TSLA",
      "fillingDate": "2016-02-24",
      "acceptedDate": "2016-02-24 16:17:56",
      "period": "FY",
      "revenue": 4046025000,
      "costOfRevenue": 3122522000,
      "grossProfit": 923503000,
      "grossProfitRatio": 0.228249454712,
      "researchAndDevelopmentExpenses": 717900000,
      "generalAndAdministrativeExpenses": 922232000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": -41652000,
      "operatingExpenses": 1640132000,
      "costAndExpenses": 4762654000,
      "interestExpense": 118851000,
      "depreciationAndAmortization": 494653000,
      "ebitda": -221976000,
      "ebitdaratio": -0.054862735648,
      "operatingIncome": -716629000,
      "operatingIncomeRatio": -0.177119271384,
      "totalOtherIncomeExpensesNet": -41652000,
      "incomeBeforeTax": -875624000,
      "incomeBeforeTaxRatio": -0.216415864954,
      "incomeTaxExpense": 13039000,
      "netIncome": -888663000,
      "netIncomeRatio": -0.219638534117,
      "eps": -6.93,
      "epsdiluted": -6.93,
      "weightedAverageShsOut": 140581000,
      "weightedAverageShsOutDil": 128202000,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000156459016013195/0001564590-16-013195-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000156459016013195/tsla-10k_20151231.htm"
    },
    {
      "date": "2014-12-31",
      "symbol": "TSLA",
      "fillingDate": "2015-02-26",
      "acceptedDate": "2015-02-26 17:13:26",
      "period": "FY",
      "revenue": 3198356000,
      "costOfRevenue": 2316685000,
      "grossProfit": 881671000,
      "grossProfitRatio": 0.275663809782,
      "researchAndDevelopmentExpenses": 464700000,
      "generalAndAdministrativeExpenses": 603660000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": 1813000,
      "operatingExpenses": 1068360000,
      "costAndExpenses": 3385045000,
      "interestExpense": 100886000,
      "depreciationAndAmortization": 301665000,
      "ebitda": 114976000,
      "ebitdaratio": 0.0359484685257,
      "operatingIncome": -186689000,
      "operatingIncomeRatio": -0.0583703002417,
      "totalOtherIncomeExpensesNet": 1813000,
      "incomeBeforeTax": -284636000,
      "incomeBeforeTaxRatio": -0.0889944709094,
      "incomeTaxExpense": 9404000,
      "netIncome": -294040000,
      "netIncomeRatio": -0.0919347314683,
      "eps": -2.36,
      "epsdiluted": -2.36,
      "weightedAverageShsOut": 140581000,
      "weightedAverageShsOutDil": 124539343,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000156459015001031/0001564590-15-001031-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000156459015001031/tsla-10k_20141231.htm"
    },
    {
      "date": "2013-12-31",
      "symbol": "TSLA",
      "fillingDate": "2014-02-26",
      "acceptedDate": "2014-02-26 16:02:51",
      "period": "FY",
      "revenue": 2013496000,
      "costOfRevenue": 1557234000,
      "grossProfit": 456262000,
      "grossProfitRatio": 0.226601890443,
      "researchAndDevelopmentExpenses": 231976000,
      "generalAndAdministrativeExpenses": 285569000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": 22602000,
      "operatingExpenses": 517545000,
      "costAndExpenses": 2074779000,
      "interestExpense": 32934000,
      "depreciationAndAmortization": 115226000,
      "ebitda": 53943000,
      "ebitdaratio": 0.0267907162468,
      "operatingIncome": -61283000,
      "operatingIncomeRatio": -0.0304361170819,
      "totalOtherIncomeExpensesNet": 22602000,
      "incomeBeforeTax": -71426000,
      "incomeBeforeTaxRatio": -0.0354736239853,
      "incomeTaxExpense": 2588000,
      "netIncome": -74014000,
      "netIncomeRatio": -0.0367589506013,
      "eps": -0.62,
      "epsdiluted": -0.62,
      "weightedAverageShsOut": 123472782,
      "weightedAverageShsOutDil": 119421414,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000119312514069681/0001193125-14-069681-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000119312514069681/d668062d10k.htm"
    },
    {
      "date": "2012-12-31",
      "symbol": "TSLA",
      "fillingDate": "2013-03-07",
      "acceptedDate": "2013-03-07 17:10:43",
      "period": "FY",
      "revenue": 413256000,
      "costOfRevenue": 383189000,
      "grossProfit": 30067000,
      "grossProfitRatio": 0.0727563544147,
      "researchAndDevelopmentExpenses": 273978000,
      "generalAndAdministrativeExpenses": 150372000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": -1828000,
      "operatingExpenses": 424350000,
      "costAndExpenses": 807539000,
      "interestExpense": 254000,
      "depreciationAndAmortization": 28769000,
      "ebitda": -365514000,
      "ebitdaratio": -0.884473546664,
      "operatingIncome": -394283000,
      "operatingIncomeRatio": -0.954088990843,
      "totalOtherIncomeExpensesNet": 0,
      "incomeBeforeTax": -396077000,
      "incomeBeforeTaxRatio": -0.958430125636,
      "incomeTaxExpense": 136000,
      "netIncome": -396213000,
      "netIncomeRatio": -0.958759219467,
      "eps": -3.69,
      "epsdiluted": -3.69,
      "weightedAverageShsOut": 114711899,
      "weightedAverageShsOutDil": 107349188,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000119312513096241/0001193125-13-096241-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000119312513096241/d452995d10k.htm"
    },
    {
      "date": "2011-12-31",
      "symbol": "TSLA",
      "fillingDate": "2012-02-27",
      "acceptedDate": "2012-02-27 17:17:24",
      "period": "FY",
      "revenue": 204242000,
      "costOfRevenue": 142647000,
      "grossProfit": 61595000,
      "grossProfitRatio": 0.301578519599,
      "researchAndDevelopmentExpenses": 208981000,
      "generalAndAdministrativeExpenses": 104102000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": -2646000,
      "operatingExpenses": 313083000,
      "costAndExpenses": 455730000,
      "interestExpense": 43000,
      "depreciationAndAmortization": 17031000,
      "ebitda": -234457000,
      "ebitdaratio": -1.14793725091,
      "operatingIncome": -251488000,
      "operatingIncomeRatio": -1.23132362589,
      "totalOtherIncomeExpensesNet": -2646000,
      "incomeBeforeTax": -253922000,
      "incomeBeforeTaxRatio": -1.24324086133,
      "incomeTaxExpense": 489000,
      "netIncome": -254411000,
      "netIncomeRatio": -1.24563507995,
      "eps": -2.53,
      "epsdiluted": -2.53,
      "weightedAverageShsOut": 114711899,
      "weightedAverageShsOutDil": 100388815,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000119312512081990/0001193125-12-081990-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000119312512081990/d279413d10k.htm"
    },
    {
      "date": "2010-12-31",
      "symbol": "TSLA",
      "fillingDate": "2011-03-03",
      "acceptedDate": "2011-03-03 14:47:36",
      "period": "FY",
      "revenue": 116744000,
      "costOfRevenue": 86013000,
      "grossProfit": 30731000,
      "grossProfitRatio": 0.26323408483519495,
      "researchAndDevelopmentExpenses": 92996000,
      "generalAndAdministrativeExpenses": 84573000,
      "sellingAndMarketingExpenses": 0,
      "otherExpenses": -6583000,
      "operatingExpenses": 177569000,
      "costAndExpenses": 263582000,
      "interestExpense": 992000,
      "depreciationAndAmortization": 10623000,
      "ebitda": -136215000,
      "ebitdaratio": -1.166783731926266,
      "operatingIncome": -146838000,
      "operatingIncomeRatio": -1.2577777016377716,
      "totalOtherIncomeExpensesNet": -6583000,
      "incomeBeforeTax": -154155000,
      "incomeBeforeTaxRatio": -1.3204532995271705,
      "incomeTaxExpense": 173000,
      "netIncome": -154328000,
      "netIncomeRatio": -1.3219351743986842,
      "eps": -3.04,
      "epsdiluted": -3.04,
      "weightedAverageShsOut": 50718302,
      "weightedAverageShsOutDil": 50718302,
      "link": "https://www.sec.gov/Archives/edgar/data/1318605/000119312511054847/0001193125-11-054847-index.htm",
      "finalLink": "https://www.sec.gov/Archives/edgar/data/1318605/000119312511054847/d10k.htm"
    }
]

// const table = document.querySelector('.fs-table-outer table');

// let header = table.createTHead();
// let row = header.insertRow(0);
// let base = row.insertCell(-1);
// let cell = row.insertCell(-1);
// cell.innerHTML = `${sampleData['0']['period']} ${sampleData['0']['fillingDate']}`;

// let count = 0;
// for (var prop in sampleData['0']) {
//     if (count > 4 && count <= 30) {
//         if (Object.prototype.hasOwnProperty.call(sampleData['0'], prop)) {
//             // do stuff
//             let newRow = table.insertRow(-1);
//             let newCell = newRow.insertCell(-1);
//             newCell.innerHTML = `${prop}`;
//             let newCell2 = newRow.insertCell(-1);
//             newCell2.innerHTML = `${sampleData['0'][prop]}`;
//         }
//     }
//     count++;
// }


// addYearData(sampleData['1']);
// addYearData(sampleData['2']);
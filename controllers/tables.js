import * as fs from '/fs.js';
import * as APIHandler from '/apiHandler.js';

let isData, bsData, cfsData, priceData, statsData, ratiosData, growthData;

// window.localStorage.setItem("isData", null); window.localStorage.setItem("bsData", null); window.localStorage.setItem("cfsData", null); window.localStorage.setItem("priceData", null); window.localStorage.setItem("statsData", null); window.localStorage.setItem("ratiosData", null); window.localStorage.setItem("growthData", null);

//set the amount of rows on the price table
const changeRows = (data) => {
    document.querySelector('#numRows').removeEventListener('change', () => {
        changeRows(data);
    });
    fs.populatePriceTable("Price Data", data['historical']);
    document.querySelector('#numRows').addEventListener('change', () => {
        changeRows(data);
    });
}

//set the amount of years on the price table
const changeYears = (tableName, data, range) => {
    fs.setNumYears(parseInt(document.querySelector('#numYears').value));
    document.querySelector('#numYears').removeEventListener('change', () => {
        changeYears(tableName, data, range);
    });
    fs.populateTable(tableName, data, range);
    document.querySelector('#numYears').addEventListener('change', () => {
        changeYears(tableName, data, range);
    });
}

const btnEventHandler = (btnName, localData, dataSet, ticker, tableName, range) => {
    document.querySelector(btnName).addEventListener('click', async () => {
        if (localStorage.getItem(localData) == null) {
            console.log("fetching data and storing in localStorage");
            const data = await APIHandler.generalFetch(dataSet, ticker);
            fs.populateTable(tableName, data, range);
            document.querySelector('#numYears').addEventListener('change', () => {
                changeYears(tableName, data, range);
            });
            localStorage.setItem(localData, JSON.stringify(data));
        } else {
            console.log("retrieving data from localStorage");
            const data = JSON.parse(localStorage.getItem(localData));
            fs.populateTable(tableName, data, range);
            document.querySelector('#numYears').addEventListener('change', () => {
                changeYears(tableName, data, range);
            });
        }
    });
}

//event handler for price btn
document.querySelector('.price-data-btn').addEventListener('click', async () => {
    if (localStorage.getItem("priceData") == null) {
        console.log("fetching data and storing in localStorage");
        const data = await APIHandler.generalFetch("historical-price-full", "TSLA");
        fs.populatePriceTable("Price Data", data['historical']);
        document.querySelector('#numRows').addEventListener('change', () => {
            changeRows(data);
        });
        localStorage.setItem("priceData", JSON.stringify(data));
    } else {
        console.log("retrieving data from localStorage");
        const data = JSON.parse(localStorage.getItem("priceData"));
        fs.populatePriceTable("Price Data", data['historical']);
        document.querySelector('#numRows').addEventListener('change', () => {
            changeRows(data);
        });
    }
});

//event handler for other btns
btnEventHandler('.stats-btn', "statsData", "key-metrics", "TSLA", "Statistics", [1, 1000]);
btnEventHandler('.ratios-btn', "ratiosData", "ratios", "TSLA", "Ratios", [1, 1000]);
btnEventHandler('.growth-btn', "growthData", "financial-growth", "TSLA", "Growth Metrics", [1, 1000]);
btnEventHandler('.is-btn', "isData", "income-statement", "TSLA", "Income Statement", [4, 30]);
btnEventHandler('.bs-btn', "bsData", "balance-sheet-statement", "TSLA", "Balance Sheet", [4, 43]);
btnEventHandler('.cfs-btn', "cfsData", "cash-flow-statement", "TSLA", "Cash Flows", [4, 34]);


{
    // //event handler for statistics btn
    // document.querySelector('.stats-btn').addEventListener('click', async () => {
    //     if (localStorage.getItem("statsData") == null) {
    
    //     }
    //     const data = await APIHandler.generalFetch("key-metrics", "TSLA");
    //     fs.populateTable("Statistics", data, [1, 1000]);
    //     document.querySelector('#numYears').addEventListener('change', () => {
    //         changeYears("Statistics", data, [1, 1000]);
    //     });
    //     console.log(data);
    // });
    
    // //event handler for ratios btn
    // document.querySelector('.ratios-btn').addEventListener('click', async () => {
    //     const data = await APIHandler.generalFetch("ratios", "TSLA");
    //     fs.populateTable("Ratios", data, [1, 1000]);
    //     document.querySelector('#numYears').addEventListener('change', () => {
    //         changeYears("Ratios", data, [1, 1000]);
    //     });
    //     console.log(data);
    // });
    
    // //event handler for growth btn
    // document.querySelector('.growth-btn').addEventListener('click', async () => {
    //     const data = await APIHandler.generalFetch("financial-growth", "TSLA");
    //     fs.populateTable("Growth Metrics", data, [1, 1000]);
    //     document.querySelector('#numYears').addEventListener('change', () => {
    //         changeYears("Growth Metrics", data, [1, 1000]);
    //     });
    //     console.log(data);
    // });
    
    // //event handler for is btn
    // document.querySelector('.is-btn').addEventListener('click', async () => {
    //     const data = await APIHandler.generalFetch("income-statement", "TSLA");
    //     fs.populateTable("Income Statement", data, [4, 30]);
    //     document.querySelector('#numYears').addEventListener('change', () => {
    //         changeYears("Income Statement", data, [4, 30]);
    //     });
    // });
    
    // //event handler for bs btn
    // document.querySelector('.bs-btn').addEventListener('click', async () => {
    //     const data = await APIHandler.generalFetch("balance-sheet-statement", "TSLA");
    //     fs.populateTable("Balance Sheet", data, [4, 43]);
    //     document.querySelector('#numYears').addEventListener('change', () => {
    //         changeYears("Balance Sheet", data, [4, 43]);
    //     });
    //     console.log(data);
    // });
    
    // //event handler for cfs btn
    // document.querySelector('.cfs-btn').addEventListener('click', async () => {
    //     const data = await APIHandler.generalFetch("cash-flow-statement", "TSLA");
    //     fs.populateTable("Cash Flows", data, [4, 34]);
    //     document.querySelector('#numYears').addEventListener('change', () => {
    //         changeYears("Cash Flows", data, [4, 34]);
    //     });
    // });
}

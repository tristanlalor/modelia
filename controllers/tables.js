import * as fs from '/fs.js';
import * as APIHandler from '/apiHandler.js';

//set the amount of rows on the price table
const changeRows = (data) => {
    //changing rows
    document.querySelector('#numRows').removeEventListener('change', () => {
        changeRows(data);
    });
    fs.populatePriceTable("Price Data", data['historical']);
    document.querySelector('#numRows').addEventListener('change', () => {
        changeRows(data);
    });
}

//set the amount of years on the price table
const changeYears = async (tableName, data, range, dataSet, localData) => {
    let numYears = parseInt(document.querySelector('#numYears').value);
    if (numYears > data.length) {
        numYears = data.length
    }
    fs.setNumYears(numYears);
    document.querySelector('#numYears').removeEventListener('change', () => {
        changeYears(tableName, data, range, dataSet, localData);
    });
    let checked = document.querySelector('.switch').children[0].checked;
    fs.populateTable(tableName, data, range);
    if (checked) document.querySelector('.switch').children[0].checked = true;
    quarterlySetup(localData, dataSet, tableName, range);
    document.querySelector('#numYears').addEventListener('change', () => {
        changeYears(tableName, data, range, dataSet, localData);
    });
}

//gets data from api, sets data in localStorage, and populates tables
const dataGetterSetterPop = async (localData, dataSet, tableName, range) => {
    if (localStorage.getItem(localData) == null) {
        //fetching data and storing in localStorage
        let data;
        if (localStorage.getItem("period") == "quarterly") {
            data = await APIHandler.generalFetch(dataSet, localStorage.getItem("symbol"), "period=quarter");
        } else {
            data = await APIHandler.generalFetch(dataSet, localStorage.getItem("symbol"));
        }
        //WRITING NEW TABLE
        fs.populateTable(tableName, data, range);
        document.querySelector('#numYears').addEventListener('change', () => {
            changeYears(tableName, data, range, dataSet, localData);
        });
        localStorage.setItem(localData, JSON.stringify(data));

        quarterlySetup(localData, dataSet, tableName, range);
    } else {
        //retrieving data from localStorage");
        const data = JSON.parse(localStorage.getItem(localData));
        //WRITING NEW TABLE
        fs.populateTable(tableName, data, range);
        document.querySelector('#numYears').addEventListener('change', () => {
            changeYears(tableName, data, range, dataSet, localData);
        });
        quarterlySetup(localData, dataSet, tableName, range);
    }
}

const btnEventHandler = (btnName, localData, dataSet, tableName, range) => {
    document.querySelector(btnName).addEventListener('click', (e) => {
        if (!e.target.classList.contains('selected') || (!e)) {
            fs.autoCollapseOnMobile();
            localStorage.setItem("period", "annual");
            dataGetterSetterPop(localData, dataSet, tableName, range);
        }
    });
}

const quarterlyToggle = async (localData, dataSet, tableName, range) => {
    //Quarterly
    if (localStorage.getItem("period") == "quarterly" && localData.substr(-9) == "Quarterly") {
        localStorage.setItem("period", "annual");
        await dataGetterSetterPop(localData.substring(0,localData.length-9), dataSet, tableName, range);
        document.querySelector('.switch').children[0].checked = false;

    } else {
        localStorage.setItem("period", "quarterly");
        await dataGetterSetterPop(localData + "Quarterly", dataSet, tableName, range);
        document.querySelector('.switch').children[0].checked = true;
    }
}

const quarterlySetup = (localData, dataSet, tableName, range) => {
    document.querySelector('.switch').addEventListener('click', (e) => {
        //quarterly
        quarterlyToggle(localData, dataSet, tableName, range);
        e.preventDefault();
        var self = document.querySelector('.switch');
        var input = self.children[0];
        if (input.checked) {
            input.checked = false;
        } else { //eventually change the else clause to trigger loading animation until AJAX returns
            // self.classList.add('load');
            //Fake ajax call
            // input.checked = true;
            setTimeout(function() {
                //If finished
                // self.classList.remove('load');
                // input.checked = true;
            }, 2000);
        }
    });
}

//event handler for price btn
document.querySelector('.price-data-btn').addEventListener('click', async (e) => {
    if (!e.target.classList.contains('selected') || (!e)) {
        fs.autoCollapseOnMobile();
        if (localStorage.getItem("priceData") == null) {
            //fetching data and storing in localStorage
            const data = await APIHandler.generalFetch("historical-price-full", localStorage.getItem("symbol"));
            fs.populatePriceTable("Price Data", data['historical']);
            document.querySelector('#numRows').addEventListener('change', () => {
                changeRows(data);
            });
            localStorage.setItem("priceData", JSON.stringify(data));
        } else {
            //retrieving data from localStorage
            const data = JSON.parse(localStorage.getItem("priceData"));
            fs.populatePriceTable("Price Data", data['historical']);
            //quarterly toggle
            document.querySelector('#numRows').addEventListener('change', () => {
                changeRows(data);
            });
        }
    }
});

//event handler for other btns
btnEventHandler('.stats-btn', "statsData", "key-metrics", "Statistics", [1, 1000]);
btnEventHandler('.ratios-btn', "ratiosData", "ratios", "Ratios", [1, 1000]);
btnEventHandler('.growth-btn', "growthData", "financial-growth", "Growth Metrics", [1, 1000]);
btnEventHandler('.is-btn', "isData", "income-statement", "Income Statement", [4, 30]);
btnEventHandler('.bs-btn', "bsData", "balance-sheet-statement", "Balance Sheet", [4, 43]);
btnEventHandler('.cfs-btn', "cfsData", "cash-flow-statement", "Cash Flows", [4, 34]);
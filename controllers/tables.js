import * as fs from '/fs.js';
import * as APIHandler from '/apiHandler.js';

//Quarterly Toggle
// $(document).ready(function() {

//     $('.switch').on('click', function(e) {
//         e.preventDefault();

//         var self = $(this);
//         var input = self.children('input');

//         if(input.is(':checked')) {
//             input.prop('checked', false);
//         } else {
//             self.addClass('load');
//             //Fake ajax call
//             setTimeout(function() {
//                 //If finished
//                 self.removeClass('load');
//                 input.prop('checked', true);
//             }, 2000);
//         }
//     });
// });



//set the amount of rows on the price table
const changeRows = (data) => {
    console.log("somehoe changing rows");
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
    console.log(tableName);
    console.log(data);
    let numYears = parseInt(document.querySelector('#numYears').value);
    console.log("paring num years: " + numYears);
    if (numYears > data.length) {
        numYears = data.length
    }
    fs.setNumYears(numYears);
    document.querySelector('#numYears').removeEventListener('change', () => {
        changeYears(tableName, data, range, dataSet, localData);
    });
    console.log({localData,dataSet,tableName,range});
    // await dataGetterSetterPop(localData, dataSet, tableName, range);
    let checked = document.querySelector('.switch').children[0].checked;
    fs.populateTable(tableName, data, range);
    if (checked) document.querySelector('.switch').children[0].checked = true;
    quarterlySetup(localData, dataSet, tableName, range);
    document.querySelector('#numYears').addEventListener('change', () => {
        changeYears(tableName, data, range, dataSet, localData);
    });
}

const dataGetterSetterPop = async (localData, dataSet, tableName, range) => {
    // window.currentTable = localData;
    if (localStorage.getItem(localData) == null) {
        console.log("fetching data and storing in localStorage");
        let data;
        if (localStorage.getItem("period") == "quarterly") {
            data = await APIHandler.generalFetch(dataSet, localStorage.getItem("symbol"), "period=quarter");
        } else {
            data = await APIHandler.generalFetch(dataSet, localStorage.getItem("symbol"));
        }
        console.log(data);
        console.log("WRITING NEW TABLE!!!!!!!!!!!!!!!!");
        fs.populateTable(tableName, data, range);
        document.querySelector('#numYears').addEventListener('change', () => {
            changeYears(tableName, data, range, dataSet, localData);
        });
        localStorage.setItem(localData, JSON.stringify(data));

        quarterlySetup(localData, dataSet, tableName, range);
    } else {
        console.log("retrieving data from localStorage");
        const data = JSON.parse(localStorage.getItem(localData));
        console.log("WRITING NEW TABLE!!!!!!!!!!!!!!!!");
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
    console.log(localData + "Quarterly");
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
        console.log("querterly");
        quarterlyToggle(localData, dataSet, tableName, range);
        e.preventDefault();
        var self = document.querySelector('.switch');
        var input = self.children[0];
        if (input.checked) {
            input.checked = false;
        } else {
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
            console.log("fetching data and storing in localStorage");
            const data = await APIHandler.generalFetch("historical-price-full", localStorage.getItem("symbol"));
            fs.populatePriceTable("Price Data", data['historical']);
            document.querySelector('#numRows').addEventListener('change', () => {
                changeRows(data);
            });
            localStorage.setItem("priceData", JSON.stringify(data));
        } else {
            console.log("retrieving data from localStorage");
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

import * as APIHandler from '/apiHandler.js';

// ########################################Q###################
//                      Financial Statement Data
// ###########################################################

let numYears = 5;
export const setNumYears = (x) => {
    numYears = x;
}
export const populateTable = (tableName, tableData, range) => {
    
   

    let fsOgContent = `
        <input type="text" id="numYears" placeholder="${numYears}">
        <div class="fs-table-title">${tableName}</div>
        <div class="fs-table-outer">
            <table>
                <tbody>
                
                </tbody>
            </table>
        </div>
        `;
   
    // if (!document.querySelector('#numYears')) {
    //     numYears = 5;
    // } else if (parseInt(document.querySelector('#numYears').value) == NaN) {
    //     numYears = 5;
    // } else {
    //     numYears = parseInt(document.querySelector('#numYears').value);
    // }
    // let numYears =  !document.querySelector('#numYears') ? 5 : parseInt(document.querySelector('#numYears').value) == NaN ? 5 : document.querySelector('#numYears').value;

    // parseInt(document.querySelector('#numYears').value) : 5;
    console.log(numYears);

    document.querySelector('.variable-content').innerHTML = fsOgContent;
    const table = document.querySelector('.fs-table-outer table');

    let header = table.createTHead();
    let row = header.insertRow(0);
    let base = row.insertCell(-1);
    let cell = row.insertCell(-1);
    if (tableName == "Income Statement" || tableName == "Balance Sheet" || tableName == "Cash Flows") {
        cell.innerHTML = `${tableData['0']['period']} ${tableData['0']['fillingDate']}`;
    } else if (tableName == "Growth Metrics" || tableName == "Statistics" || tableName == "Ratios") {
        cell.innerHTML = `${tableData['0']['date']}`
    }

    let count = 0;
    for (var prop in tableData['0']) {
        if (count > range[0] && count <= range[1]) {
            if (Object.prototype.hasOwnProperty.call(tableData['0'], prop)) {
                // do stuff
                let newRow = table.insertRow(-1);
                let newCell = newRow.insertCell(-1);
                newCell.innerHTML = `${prop}`;
                let newCell2 = newRow.insertCell(-1);
                newCell2.innerHTML = `${tableData['0'][prop]}`;
            }
        }
        count++;
    }
    addYearData(tableData, numYears - 1, range, tableName);
}

export const addYearData = (obj, num, range, tableName) => {
    for (let i = 0; i < num; i++) {
        let activeColumn = obj[i.toString(10)];
        const table = document.querySelector('.fs-table-outer table');
        let headerRow = document.querySelector('.fs-table-outer table thead tr')
        let cell = headerRow.insertCell(-1);
        if (tableName == "Income Statement" || tableName == "Balance Sheet" || tableName == "Cash Flows") {
            cell.innerHTML = `${obj[i]['period']} ${obj[i]['fillingDate']}`;
        } else if (tableName == "Growth Metrics" || tableName == "Statistics" || tableName == "Ratios") {
            cell.innerHTML = `${obj[i]['date']}`
        }
        let rowNum = 0 - range[0];
        let count = 0;
        for (var prop in activeColumn) {
            if (count > range[0] && count <= range[1]) {
                if (Object.prototype.hasOwnProperty.call(obj['0'], prop)) {
                    // do stuff
                    let row = table.rows[rowNum];
                    let newCell = row.insertCell(-1);
                    newCell.innerHTML = `${activeColumn[prop]}`;
                }
            }
            count++;
            rowNum++;
        }
    }
}
// ###########################################################
//                      Price Data
// ###########################################################

export const populatePriceTable = (tableName, tableData, ) => {
    let numRows = document.querySelector('#numRows') ? parseInt(document.querySelector('#numRows').value) : 100;
    let fsOgContent = `
        <input type="text" id="numRows">

        <div class="fs-table-title">${tableName}</div>
        <div class="fs-table-outer">
            <table>
                <tbody>
                
                </tbody>
            </table>
        </div>
        `;
        
    
    // document.querySelector('.submit').addEventListener('click')

    document.querySelector('.variable-content').innerHTML = fsOgContent;

    document.querySelector('#numRows').value = numRows;

    const table = document.querySelector('.fs-table-outer table');

    let header = table.createTHead();
    let row = header.insertRow(0);
    let base = row.insertCell(-1);
    const headers = ["open", "high", "low", "close", "adjClose", "volume", "unajustedVolume", "vwap", "change", "changePercntage", "changeOverTime", "date"];
    
    for (let i = 0; i < headers.length; i++) {
        let cell = row.insertCell(-1);
        cell.innerHTML = headers[i];
    }
    // cell.innerHTML = `${tableData['historical']['period']} ${tableData['0']['fillingDate']}`;

    let count = 0;

    //change to loop through array, "label" property should be on left

    for (let j = 0; j < numRows; j++) {
        let newRow = table.insertRow(-1);
        let newCell = newRow.insertCell(-1);
        newCell.innerHTML = `${tableData[j]['label']}`;
        //loop thru headers and add field for each header to row i
        for (let i = 0; i < headers.length; i++) {
            let cell = newRow.insertCell(-1);
            cell.innerHTML = tableData[j][headers[i]];
        }
        // let newCell2 = newRow.insertCell(-1);
        // newCell2.innerHTML = `${tableData['0'][prop]}`;
    }

    // for (var prop in tableData['0']) {
    //     if (count > 4 && count <= 30) {
    //         if (Object.prototype.hasOwnProperty.call(tableData['0'], prop)) {
    //             // do stuff
    //             let newRow = table.insertRow(-1);
    //             let newCell = newRow.insertCell(-1);
    //             newCell.innerHTML = `${prop}`;
    //             let newCell2 = newRow.insertCell(-1);
    //             newCell2.innerHTML = `${tableData['0'][prop]}`;
    //         }
    //     }
    //     count++;
    // }
    // addPriceData(tableData['1']);
    // addPriceData(tableData['2']);
}

// export const addPriceData = (obj) => {
//     const table = document.querySelector('.fs-table-outer table');
//     let headerRow = document.querySelector('.fs-table-outer table thead tr')
//     let cell = headerRow.insertCell(-1);
//     cell.innerHTML = `${obj['period']} ${obj['fillingDate']}`;
//     let rowNum = -4;
//     let count = 0;
//     for (var prop in obj) {
//         if (count > 4 && count <= 30) {
//             if (Object.prototype.hasOwnProperty.call(APIHandler.sampleData['0'], prop)) {
//                 // do stuff
//                 let row = table.rows[rowNum];
//                 let newCell = row.insertCell(-1);
//                 newCell.innerHTML = `${obj[prop]}`;
//             }
//         }
//         count++;
//         rowNum++;
//     }
// }
// ###########################################################











let fsCollapseNav = () => {
    let nav = document.querySelector('.fs-nav');
    let content = document.querySelector('.fs-content');
    content.classList.toggle('fs-full');
    nav.style.transform === 'translateX(-100%)' ? nav.style.transform = 'translateX(0)' : nav.style.transform = 'translateX(-100%)';
    document.querySelector('.fs-collapse-nav').classList.toggle('fs-collapse-nav-collapsed');
}

document.querySelector('.fs-collapse-nav').addEventListener('click', fsCollapseNav);


//Add selected class to fs-nav-items
document.querySelector('.fs-nav').addEventListener('click', e => {
    if (e.target.classList.contains('fs-nav-item')) {
        Array.prototype.slice.call(document.querySelectorAll(".fs-nav-item")).forEach((el, index) => {
           el.classList.remove('selected');
        });
        e.target.classList.add('selected');
    }
});

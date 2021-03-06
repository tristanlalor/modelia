import * as summary from '/summary.js';

// ########################################Q###################
//                      Financial Statement Data
// ###########################################################

let numYears = 5;
export const setNumYears = (x) => {
    numYears = x;
}
const setNumRows = (numRows) => {
    if (numRows) {
        document.querySelector('#numRows').placeholder = "Rows: " + numRows;
    } else {
        numRows = document.querySelector('#numRows') ? parseInt(document.querySelector('#numRows').value) : 100;
    }
    return numRows;
}

export const populateTable = (tableName, tableData, range) => {
    if (numYears > tableData.length) {
        numYears = tableData.length
    }
    let fsOgContent = `
    <div class="table-tools">
    <img class="search-icon" id="search" src="img/columns.svg" style="height: 22px;" onclick="document.getElementById('numYears').focus();"></img>
                <input id="numYears" placeholder="${isNaN(numYears) ? "Invalid: Enter a Number" : `Periods: ${numYears}`}" type="text"></input>
        <label class="switch">
            <input type="checkbox">
            <div class="checkbox"></div>
            <span>Quarterly</span>
        </label>
    </div>
    <div class="fs-table-title">${tableName}</div>
    <div class="fs-table-outer">
        <table>
            <tbody>
            
            </tbody>
        </table>
    </div>
        `;

    document.querySelector('.variable-content').innerHTML = fsOgContent;
    const table = document.querySelector('.fs-table-outer table');

    let header = table.createTHead();
    let row = header.insertRow(0);
    let cell = row.insertCell(-1);
    if (tableName == "Income Statement" || tableName == "Balance Sheet" || tableName == "Cash Flows") {
        let period = "FY";
        if (localStorage.getItem("period") == "quarterly") {
            period = tableData['0']['period'] == "FY" ? "Q4" : tableData['0']['period'];
        }
        cell.innerHTML = `${period} ${tableData['0']['fillingDate'].substring(0, 4)}`;
    } else if (tableName == "Growth Metrics" || tableName == "Statistics" || tableName == "Ratios") {
        cell.innerHTML = `${tableData['0']['date']}`
    }

    let count = 0;
    for (var prop in tableData['0']) {
        if (count > range[0] && count <= range[1]) {
            if (Object.prototype.hasOwnProperty.call(tableData['0'], prop)) {
                let newRow = table.insertRow(-1);
                let newCell = newRow.insertCell(-1);
                let contents = `${prop}`.replace(/([A-Z][a-z])/g, ' $1').trim();
                contents = contents.replace(/^./, contents[0].toUpperCase());
                newCell.innerHTML = contents;
                let newCell2 = newRow.insertCell(-1);
                newCell2.innerHTML = `${summary.nFormatter(tableData['0'][prop], 2)}`;
            }
        }
        count++;
    }
    addYearData(tableData, numYears, range, tableName);
}

export const addYearData = (obj, num, range, tableName) => {
    for (let i = 1; i < num; i++) {
        let activeColumn = obj[i.toString(10)];
        const table = document.querySelector('.fs-table-outer table');
        let headerRow = document.querySelector('.fs-table-outer table thead tr')
        let cell = headerRow.insertCell(-1);
        if (tableName == "Income Statement" || tableName == "Balance Sheet" || tableName == "Cash Flows") {
            let period = "FY";
            if (localStorage.getItem("period") == "quarterly") {
                period = obj[i]['period'] == "FY" ? "Q4" : obj[i]['period'];
            }
            cell.innerHTML = `${period} ${obj[i]['fillingDate'].substring(0, 4)}`;
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
                    newCell.innerHTML = `${summary.nFormatter(activeColumn[prop], 2)}`;
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

export const populatePriceTable = (tableName, tableData) => {
    let numRows = setNumRows();
    if (numRows > tableData.length) {
        numRows = tableData.length;
    }

    let fsOgContent = `
        <div class="table-tools">
            <img class="search-icon" id="search" src="img/columns.svg" style="height: 22px;" onclick="document.getElementById('numRows').focus();"></img>
            <input id="numRows" placeholder="${isNaN(numRows) ? "Invalid: Enter a Number" : `Rows: ${numRows}`}" type="text"></input>
        </div>

        <div class="fs-table-title">${tableName}</div>
        <div class="fs-table-outer">
            <table>
                <tbody>
                
                </tbody>
            </table>
        </div>
        `;

    document.querySelector('.variable-content').innerHTML = fsOgContent;

    const table = document.querySelector('.fs-table-outer table');

    let header = table.createTHead();
    let row = header.insertRow(0);
    let base = row.insertCell(-1);
    const headers = ["open", "high", "low", "close", "adjClose", "volume", "unajustedVolume", "vwap", "change", "changePercntage", "changeOverTime", "date"];
    
    for (let i = 0; i < headers.length; i++) {
        let cell = row.insertCell(-1);
        let contents = `${headers[i]}`.replace(/([A-Z][a-z])/g, ' $1').trim();
            contents = contents.replace(/^./, contents[0].toUpperCase());
            cell.innerHTML = contents;
        cell.innerHTML = contents;
    }
    let count = 0;

    //change to loop through array, "label" property should be on left

    for (let j = 0; j < numRows; j++) {
        let newRow = table.insertRow(-1);
        let newCell = newRow.insertCell(-1);
        newCell.innerHTML = `${tableData[j]['label']}`;
        //loop thru headers and add field for each header to row i
        for (let i = 0; i < headers.length; i++) {
            let cell = newRow.insertCell(-1);
            let contents;
            contents = headers[i] != 'date' ? summary.nFormatter(tableData[j][headers[i]], 2): tableData[j][headers[i]];
            if (contents == 'NaN') {contents = '–'};
            cell.innerHTML = contents;
        }
    }
}



//Extending the HTMLElement prototype to have a new function called pseudoStyle which accepts a pseudo element (:before, :after for example) a property, and a value. We then add a new unique class to the element, which is defined in a new “pseudoStyles” stylesheet that gets injected into the head of the document
var UID = {
	_current: 0,
	getNew: function(){
		this._current++;
		return this._current;
	}
};

HTMLElement.prototype.pseudoStyle = function(element,prop,value){
	var _this = this;
	var _sheetId = "pseudoStyles";
	var _head = document.head || document.getElementsByTagName('head')[0];
	var _sheet = document.getElementById(_sheetId) || document.createElement('style');
	_sheet.id = _sheetId;
	var className = "pseudoStyle" + UID.getNew();
	
	_this.className +=  " "+className; 
	
	_sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
	_head.appendChild(_sheet);
	return this;
};

window.navCollapsed = false;
export let fsCollapseNav = () => {
    let nav = document.querySelector('.fs-nav');
    let content = document.querySelector('.fs-content');
    content.classList.toggle('fs-full');
    document.querySelector('.fs-collapse-nav').classList.toggle('fs-collapse-nav-collapsed');

    if (!navCollapsed) {
        document.querySelector('.fs-search-box').style.transform = "translateX(15px)";
        nav.style.transform = 'translateX(-100%)';
        navCollapsed = true;
    } else {
        document.querySelector('.fs-search-box').style.transform = "translateX(0)";
        nav.style.transform = 'translateX(0)'
        navCollapsed = false;
    }

    //toggle hamburger menu color
    document.querySelector('.hamburger').classList.toggle('ham-collapsed');

        //advanced code
    getComputedStyle(document.querySelector('.hamburger'), ':before').getPropertyValue('background') == "rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box" ? (document.querySelector('.hamburger').pseudoStyle("before","background","rgb(204, 204, 204)"), document.querySelector('.hamburger').pseudoStyle("after","background","rgb(204, 204, 204)")) : (document.querySelector('.hamburger').pseudoStyle("before","background","rgb(255, 255, 255)"), document.querySelector('.hamburger').pseudoStyle("after","background","rgb(255, 255, 255)"));

}

document.querySelector('.fs-collapse-nav').addEventListener('click', fsCollapseNav);


let ua = window.navigator.userAgent;
const iOS = () => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
let webkit = !!ua.match(/WebKit/i);
let iOSSafari = iOS() && webkit;
export const autoCollapseOnMobile = () => {
    //RESIZE EVENT
    if (window.innerWidth <= 750) {
        //SMALL WINDOW
        if (!document.querySelector('.hamburger').classList.contains('ham-collapsed')) {
            //TRIGGERING COLLAPSE
            fsCollapseNav();
        }
    } else {
        //LARGE WINDOW
        if (document.querySelector('.hamburger').classList.contains('ham-collapsed')) {
            fsCollapseNav();
        }
    }
    //Move bottom arrow if on iOSSafari
    if (iOSSafari) {
        document.querySelector('.fs-collapse-nav').style.bottom = "69px";
    }
}
window.addEventListener('resize', autoCollapseOnMobile);

//Add selected class to fs-nav-items
document.querySelector('.fs-nav').addEventListener('click', e => {
    if (e.target.classList.contains('fs-nav-item') && !e.target.classList.contains('selected')) {
        Array.prototype.slice.call(document.querySelectorAll(".fs-nav-item")).forEach((el, index) => {
           el.classList.remove('selected');
        });
        e.target.classList.add('selected');
    }
});

import * as APIHandler from '/apiHandler.js';

let fsOgContent = `
<div class="fs-table-title">Financial Statement</div>
                    <div class="fs-table-outer">
                        <table>
                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>
`

document.querySelector('.is-btn').addEventListener('click', () => {
    document.querySelector('.variable-content').innerHTML = fsOgContent;
    const table = document.querySelector('.fs-table-outer table');

    let header = table.createTHead();
    let row = header.insertRow(0);
    let base = row.insertCell(-1);
    let cell = row.insertCell(-1);
    cell.innerHTML = `${APIHandler.sampleData['0']['period']} ${APIHandler.sampleData['0']['fillingDate']}`;

    let count = 0;
    for (var prop in APIHandler.sampleData['0']) {
        if (count > 4 && count <= 30) {
            if (Object.prototype.hasOwnProperty.call(APIHandler.sampleData['0'], prop)) {
                // do stuff
                let newRow = table.insertRow(-1);
                let newCell = newRow.insertCell(-1);
                newCell.innerHTML = `${prop}`;
                let newCell2 = newRow.insertCell(-1);
                newCell2.innerHTML = `${APIHandler.sampleData['0'][prop]}`;
            }
        }
        count++;
    }
    APIHandler.addYearData(APIHandler.sampleData['1']);
    APIHandler.addYearData(APIHandler.sampleData['2']);
})


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

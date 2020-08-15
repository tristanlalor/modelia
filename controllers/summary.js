import * as graphlib from '/graphs.js';
import * as fs from '/fs.js';
import * as APIHandler from '/apiHandler.js';
// import { post } from '../routes';

export let symbol;
if (localStorage.getItem("symbol") == null) {
    symbol = "AAPL";
    localStorage.setItem("symbol", symbol);

}
export let relevantQuery = "";

//############################################################
//Symbol Handler
// const symbolHandler = () => {
//     document.querySelector('.fs-search-text').addEventListener('change', () => {
//         localStorage.clear();
//         symbol = document.querySelector('.fs-search-text').value;
//         console.log("LOGGING");
//         topInit();
//     });
// }
const resultClicked = (ticker) => {
    //make profile the active button
        //code
    fs.setNumYears(5);
    document.querySelector('.search-icon').style.transform = "rotate(90deg)";
    document.querySelector('.loading img').style.opacity = 0;
    document.querySelector('.fs-search-results').innerHTML = "";
    localStorage.clear();
    localStorage.setItem('symbol', ticker);
    symbol = ticker;
    removeEventHandlers();
    topInit();

    let content = document.querySelector('.fs-content');
    if (content.classList.contains('fs-full')) fs.fsCollapseNav();
    console.log(`New Ticker is ${ticker}`);
}
window.resultClicked = resultClicked;
const removeEventHandlers = () => {
    console.log("destroying event handlers");
    document.removeEventListener('keyup', keyUpEventHandler);
    document.removeEventListener('click', focusOutClick);
    // document.querySelector('.fs-search-text').removeEventListener('focus', focusEventHandler);
}
const focusOutClick = (event) => {
    document.querySelector('.loading img').style.opacity = 0;
    console.log(event.target.classList[0]);
    if (event.target.classList[0] != "fs-search-text" && document.activeElement.classList[0] != "fs-search-text") {
        document.querySelector('.search-icon').style.transform = "none";
        document.querySelector('.fs-search-results').innerHTML = "";
        removeEventHandlers();
    }
}
window.resultClicked = resultClicked;

let createSearchResultHTML = (companyName, ticker) => {
    let searchResult = `
            <div class="fs-search-result" onclick="resultClicked(this.children[0].innerHTML.trim()); console.log('CLICK')">
                <div>
                    ${ticker}
                </div>
                <div>
                    ${companyName}
                </div>
            </div>
    `;
    return searchResult;
}
const keyUpEventHandler = async () => {
    console.log("keypress detected");
        if (document.querySelector('.fs-search-text').value != "") {
            //add loading icon
            //afterstart fs-search-results
            // if (document.querySelector('.loading') == null) {
            //     document.querySelector('.fs-search-results').insertAdjacentHTML('afterbegin', '<div class="loading"><img src="img/loader.svg"></div>');
            // }
            if (document.querySelector('.loading img').style.opacity == 0) {
                document.querySelector('.loading img').style.opacity = 1;
            }
            let query = document.querySelector('.fs-search-text').value;
            console.log("short circuiting other queries");
            relevantQuery = query;
            let searchResultsData = await APIHandler.fetchSearchResults(query);
            // let searchResults = `<div class="fs-search-results">`;
            let searchResults = "";
            searchResultsData.forEach((el, index) => {
                let searchResult = createSearchResultHTML(el.name, el.symbol);
                searchResults += searchResult;
            });
            if (searchResultsData.length == 0) {
                searchResults = `
                    <div class="fs-search-result">
                        <div>No results</div>
                    </div>
            `
            }
            if (query == relevantQuery) {
                document.querySelector('.fs-search-results').innerHTML = searchResults;
                document.querySelector('.loading img').style.opacity = 0;
            }

        }
}
const focusEventHandler = () => {
    console.log("focus detected");
    document.querySelector('.search-icon').style.transform = "rotate(90deg)";
    document.addEventListener('keyup', keyUpEventHandler);
    document.addEventListener('click', focusOutClick);
}
const searchHandler = () => {
    //addEventListener => when fs-search-text is in focus, show search results
    document.querySelector('.fs-search-text').addEventListener('focus', focusEventHandler);
}

//############################################################

//##############################
//             1. GET DATA
//##############################
let profileData, quoteData, ratingData;
export const getProfileData = async () => {
    if (localStorage.getItem("profileData") == null) {
        console.log("fetching profileData and storing in localStorage");
        profileData = await APIHandler.generalFetch("profile", symbol);
        localStorage.setItem("profileData", JSON.stringify(profileData));
        console.log(profileData);
    } else {
        console.log("retrieving profileData from localStorage");
        profileData = JSON.parse(localStorage.getItem("profileData"));
        console.log(profileData);
    }
}
export const getQuoteData = async () => {
    if (localStorage.getItem("quoteData") == null) {
        console.log("fetching quoteData and storing in localStorage");
        quoteData = await APIHandler.generalFetch("quote", symbol);
        localStorage.setItem("quoteData", JSON.stringify(quoteData));
        console.log(quoteData);
    } else {
        console.log("retrieving quoteData from localStorage");
        quoteData = JSON.parse(localStorage.getItem("quoteData"));
        console.log(quoteData);
    }
}
export const getRatingData = async () => {
    if (localStorage.getItem("ratingData") == null) {
        console.log("fetching ratingData and storing in localStorage");
        ratingData = await APIHandler.generalFetch("rating", symbol);
        localStorage.setItem("ratingData", JSON.stringify(ratingData));
        console.log(ratingData);
    } else {
        console.log("retrieving ratingData from localStorage");
        ratingData = JSON.parse(localStorage.getItem("ratingData"));
        console.log(ratingData);
    }
}

export const nFormatter = (num, digits) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "B" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    let changed = "";
    if (num < 0) {
        num *= -1;
        changed = "-";
    }
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    // if (changed) num *= -1;
    return changed + (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}


const updateFavorites = () => {
    console.log("UPDATING FAVORITES");
    let favoritesHTML = ``;
    let array;
    if (loggedIn) {
        array = user.favorites;
    } else {
        array = defaultFavorites;
    }
    array.forEach((el, index, array) => {
        favoritesHTML += `
            <div>
                <div class="favorite-name">${el.companyName}</div>
                <div class="favorite" id="fav-${index}" onclick="
                    let ticker = this.children[0].innerHTML; 
                    resultClicked(ticker); 
                    document.querySelector('.all-pages-container').style.transform = 'translateX(-0vw)'; 
                    lastTranslateAmt = 0; 
                    lastTranslateAmtSelector = 0; 
                    Array.prototype.slice.call(document.querySelectorAll('.btn')).forEach((el, index) => {
                        el.classList.remove('btn-active');
                    });
                    Array.prototype.slice.call(document.querySelectorAll('.fs-nav-item')).forEach((el, index) => {
                        if (index == 0) {
                            el.classList.add('selected'); 
                        } else {
                            el.classList.remove('selected');
                        }
                     });
                    document.querySelector('.btn-1').classList.add('btn-active');
                ">
                    <div style="display: none;">${el.symbol}</div>
                </div>
            </div>
        `;
    });
    // let favoritesHTML = `
    // ${loggedIn ? favoritesIterative : "PLEASE LOG IN"}
    // `;
    favoritesHTML += `
        <i aria-hidden="true"></i>
        <i aria-hidden="true"></i>
        <i aria-hidden="true"></i>
        <i aria-hidden="true"></i>
        <i aria-hidden="true"></i>
        <i aria-hidden="true"></i>
    `;
    document.querySelector('.favorites-box').innerHTML = favoritesHTML;
    
    array.forEach((el, index, array) => {
        document.querySelector(`#fav-${index}`).style.backgroundImage = `url('${el.image}')`;
        console.log('ADDING BACKDROP FILTER');
        document.querySelector(`#fav-${index}`).style.backdropFilter = `blur(5px);`;
    });

    
}

const defaultFavorites = [
    {
      "symbol": "AAPL",
      "image": "https://financialmodelingprep.com/image-stock/AAPL.jpg",
      "companyName": "Apple Inc."
    },
    {
      "symbol": "AMZN",
      "image": "https://financialmodelingprep.com/image-stock/AMZN.jpg",
      "companyName": "Amazon.com Inc."
    },
    {
      "symbol": "F",
      "image": "https://financialmodelingprep.com/image-stock/F.jpg",
      "companyName": "Ford Motor Company"
    },
    {
      "symbol": "CSCO",
      "image": "https://financialmodelingprep.com/image-stock/CSCO.jpg",
      "companyName": "Cisco Systems Inc."
    },
    {
      "symbol": "GOOGL",
      "image": "https://financialmodelingprep.com/image-stock/GOOGL.jpg",
      "companyName": "Alphabet Inc."
    },
    {
      "symbol": "SAH",
      "image": "https://financialmodelingprep.com/image-stock/SAH.jpg",
      "companyName": "Sonic Automotive Inc."
    },
    {
      "symbol": "GS",
      "image": "https://financialmodelingprep.com/image-stock/GS.jpg",
      "companyName": "Goldman Sachs Group Inc. (The)"
    },
    {
      "symbol": "TSLA",
      "image": "https://financialmodelingprep.com/image-stock/TSLA.jpg",
      "companyName": "Tesla Inc."
    },
    {
      "symbol": "MCD",
      "image": "https://financialmodelingprep.com/image-stock/MCD.jpg",
      "companyName": "McDonald's Corporation"
    },
    {
      "symbol": "WMT",
      "image": "https://financialmodelingprep.com/image-stock/WMT.jpg",
      "companyName": "Walmart Inc."
    },
    {
      "symbol": "DIS",
      "image": "https://financialmodelingprep.com/image-stock/DIS.jpg",
      "companyName": "The Walt Disney Company"
    },
    {
      "symbol": "MED",
      "image": "https://financialmodelingprep.com/image-stock/MED.jpg",
      "companyName": "MEDIFAST INC"
    }
  ];
export const topInit = async () => {
    await getProfileData();
    await getQuoteData();
    await getRatingData();
    const oldSearch = `
    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="search">
                    <path d="M8.3283 0C3.73857 0 0 3.73857 0 8.3283C0 12.918 3.73857 16.6566 8.3283 16.6566C10.3242 16.6566 12.1571 15.9479 13.5937 14.7714L18.5663 19.7439C18.643 19.8239 18.7349 19.8877 18.8366 19.9316C18.9383 19.9756 19.0478 19.9988 19.1586 20C19.2694 20.0011 19.3793 19.9801 19.4819 19.9382C19.5845 19.8963 19.6777 19.8344 19.756 19.756C19.8344 19.6777 19.8963 19.5845 19.9382 19.4819C19.9801 19.3793 20.0011 19.2694 20 19.1586C19.9988 19.0478 19.9756 18.9383 19.9316 18.8366C19.8877 18.7349 19.8239 18.643 19.7439 18.5663L14.7714 13.5937C15.9479 12.1571 16.6566 10.3242 16.6566 8.3283C16.6566 3.73857 12.918 0 8.3283 0ZM8.3283 1.66566C12.0178 1.66566 14.9909 4.63876 14.9909 8.3283C14.9909 12.0178 12.0178 14.9909 8.3283 14.9909C4.63876 14.9909 1.66566 12.0178 1.66566 8.3283C1.66566 4.63876 4.63876 1.66566 8.3283 1.66566Z"></path>
                    </svg>
                <input class="fs-search-text" placeholder="Search Companies" type="text"></input>
                <div class="loading"><img src="img/loader2.svg"></div>
    `;
    const newSearch = `
    <div class="search">
    <div class="icon">
        <span>
            <svg viewBox="0 0 30 30">
                <path d="M3,3 L37,37"></path>
            </svg>
        </span>
    </div>
    <div class="field">
        <input class="fs-search-text" type="text" placeholder="Search companies...">
    </div>
</div>
    `;

    console.log(JSON.parse(localStorage.getItem("profileData"))[0].image);
    if (profileData['0'] != undefined) {
        let topContent = `
            <div class="fs-search-box">
                ${oldSearch}
            </div>
            <div class="fs-search-results"></div>
            <div class="underline" style="
                border-bottom: solid rgb(233, 234, 238) 1px; 
                width: calc(100% - 50px); margin-left: 25px; top: 40px;
                position: relative; z-index: 1;">
            </div>
            <div class="top-info">
                <div class="company-pic"></div>
                <div class="company-highlights-box">
                    <div class="company-name-box"><div class="company-name">${profileData['0'].companyName}</div>
                    ${ loggedIn ? `
                    <form action="/users/update" method="POST" id="favorites-form">
                        <div class="form-group">
                            <input
                                type="symbol"
                                id="symbol"
                                name="symbol"
                                class="form-control"
                                placeholder="Enter Symbol"
                                value="${localStorage.getItem("symbol")}"
                                style="display: none"
                            />
                        </div>
                        ${
                            user.favorites.filter(favorite => favorite.symbol === localStorage.getItem("symbol")).length > 0 ? `
                            <button type="submit" class="btn-primary btn-block" id="add-favorite-btn">
                                Unfavorite
                            </button>
                            ` : `
                            <button type="submit" class="btn-primary btn-block" id="add-favorite-btn">
                                Favorite
                            </button>`
                        }
                        
              </form>
                    ` : `
                    <a href="/users/login" class="btn-primary btn-block" id="add-favorite-btn">
                        Favorite
                    </a>`}
                    </div>
                    <div class="company-stats-box">
                    

                        <img src="img/mkcap.svg" alt="" style="width: 15px; filter: invert(.5);">
                        <div class="company-stat">Market Cap: ${nFormatter(profileData['0'].mktCap, 1)}</div>
                        <img src="img/stockup.svg" alt="" style="width: 15px; margin-left: 25px; transform: rotate(-45deg); filter: hue-rotate(-60deg);">
                        <div class="company-stat">Share Price: $${profileData['0'].price}</div>
                    </div>
                </div>
            </div>
        `;
        
        document.querySelector('.top').innerHTML = topContent;
        document.querySelector('.loading img').style.opacity = 0;
        document.querySelector('.company-pic').style.backgroundImage = `url('${profileData['0'].image}')`;
        // searchHandler();
        // document.querySelector('.fs-search-box').insertAdjacentHTML('afterend', searchResults);
        profileInit();
        searchHandler();
        
        window.post = function(request) {
            return fetch(request);
        }
        var form = document.getElementById("favorites-form");
        function handleForm(event) {
            let add;
            if (user.favorites.filter(favorite => favorite.symbol === localStorage.getItem("symbol")).length > 0) {
                add = false;
                document.querySelector('#add-favorite-btn').innerHTML = "Favorite";
            } else {
                add = true;
                document.querySelector('#add-favorite-btn').innerHTML = "Unfavorite";
            }
            const data = {"symbol": localStorage.getItem("symbol"), "image": profileData['0'].image, "companyName": profileData['0'].companyName, add: add};
            add ? user.favorites.push(data) : user.favorites = user.favorites.filter( (obj) => {
                return obj.symbol !== localStorage.getItem("symbol");
            });
            console.log(data);
            console.log("HANDLING POST: ");
            event.preventDefault();  
            var request = new Request("/users/update", {
                method: 'POST', 
                headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }, 
                body: JSON.stringify(data)});
            console.log(add ? "ADDING FAVORITE" : "REMOVING FAVORITE");
            post(request); 
            updateFavorites();
        } 
        if (form) form.addEventListener('submit', handleForm);
        updateFavorites();
    } else {
        let topContent = `
            <div class="fs-search-box">
                ${oldSearch}
            </div>
            <div class="fs-search-results"></div>
            <div class="underline" style="
                border-bottom: solid rgb(233, 234, 238) 1px; 
                width: calc(100% - 50px); margin-left: 25px; top: 40px;
                position: fixed; z-index: 10;">
            </div>
            <div class="error">We are having some trouble loading this security right now. Please try another.</div>`
        document.querySelector('.top').innerHTML = topContent;
        document.querySelector('.loading img').style.opacity = 0;
        document.querySelector('.variable-content').innerHTML = "";
        searchHandler();
    }
    fs.autoCollapseOnMobile();
}
topInit();
window.topInit = topInit;
const profileRender = (e) => {
    if (!document.querySelector('.profile-btn').classList.contains('selected') || (!e)) {
        fs.autoCollapseOnMobile();
        document.querySelector('.variable-content').innerHTML = variableContent;
        graphlib.createOpChart();
        // graphlib.createCandlestickChart();
        graphlib.createPriceChart();
        containerQueryListener();
    }
}
let variableContent;
const profileInit = () => {
    //algorithm to detect end of sentence and exclude periods from inc. and co.
    let descriptionList = profileData['0'].description.split(".", 10);
    let description = "";
    //.some breaks the loop when an iteration returns true
    //Stop writing the description at the end of the first sentence
    descriptionList.some((el, index, array) => {
        description += el + ".";
        try {
            return !(el.substring(el.length-3) == "Inc" || el.substring(el.length-3) == "Ltd" || el.substring(el.length-2) == "Co"|| el.substring(el.length-4) == "Corp" || array[index + 1].substring(0,3) == "com" || array[index + 1].substring(0,1) == array[index + 1].substring(0,1).toLowerCase || array[index + 1].substring(0,1) == array[index + 1].substring(1,2).toLowerCase || el.length < 15);
        } catch {
            description = "No description available for this security";
            return true;
        }
        
    });

    //handle rating section
    let ratingSection = "";
    if (ratingData['0'] != undefined) {
        ratingSection = `
    <div class="grid-item grid-item-4">
        <div class="rating-container">
            <div>
                <h2>Rating</h2>
                <div>${ratingData['0'].rating}</div>
            </div>

            <table>
            <tr>
                <th>Type</th>
                <th>Rating</th>
                <th>Recommendation</th>
            </tr>
            <tr>
                <td>Overall</td>
                <td>${ratingData['0'].ratingScore}</td>
                <td>${ratingData['0'].ratingRecommendation}</td>
            </tr>
            <tr>
                <td>DCF</td>
                <td>${ratingData['0'].ratingDetailsDCFScore}</td>
                <td>${ratingData['0'].ratingDetailsDCFRecommendation}</td>
            </tr>
            <tr>
                <td>DE</td>
                <td>${ratingData['0'].ratingDetailsDEScore}</td>
                <td>${ratingData['0'].ratingDetailsDERecommendation}</td>
            </tr>
            <tr>
                <td>PB</td>
                <td>${ratingData['0'].ratingDetailsPBScore}</td>
                <td>${ratingData['0'].ratingDetailsPBRecommendation}</td>
            </tr>
            <tr>
                <td>PE</td>
                <td>${ratingData['0'].ratingDetailsPEScore}</td>
                <td>${ratingData['0'].ratingDetailsPERecommendation}</td>
            </tr>
            <tr>
                <td>ROA</td>
                <td>${ratingData['0'].ratingDetailsROAScore}</td>
                <td>${ratingData['0'].ratingDetailsROARecommendation}</td>
            </tr>
            <tr>
                <td>ROE</td>
                <td>${ratingData['0'].ratingDetailsROEScore}</td>
                <td>${ratingData['0'].ratingDetailsROERecommendation}</td>
            </tr>
            </table>
        </div>
    </div>
        `;
    } else {
        ratingSection = `
    <div class="grid-item grid-item-4" style="display: flex; flex-direction: column;">
        <h2>Rating</h2>
        <div class="fs-sum-block" style="padding: 25px; align-self: stretch; justify-self: stretch; height: 100%; width: calc(100% - 62px); ">
            <div>
                Rating data is not yet available for this security.
            </div>
        </div>
    </div>
        `
    }
    const gridItem2 = `
    <div class="grid-item grid-item-2">
        <div class="fs-sum-block">
            <div>
                Sector
            </div>
            <div>
                ${profileData['0'].sector}
            </div>
        </div>
    </div>
    `;

    const gridItem3 = `
    <div class="grid-item grid-item-3">
    <h2>Background</h2>
                    <div class="fs-sum-row">
                        <div class="fs-sum-block">
                            <div>
                                $${profileData['0'].lastDiv}
                            </div>
                            <div>
                                Last Div
                            </div>
                        </div>
                        <div class="fs-sum-block">
                            <div>
                                ${profileData['0'].beta}
                            </div>
                            <div>
                                Beta
                            </div>
                        </div>
                        <div class="fs-sum-block">
                            <div>
                                ${profileData['0'].volAvg}
                            </div>
                            <div>
                                Avg Volume
                            </div>
                        </div>
                    </div>
                    <div class="fs-sum-row">
                        <div class="fs-sum-block">
                            <div>
                                ${profileData['0'].exchange}
                            </div>
                            <div>
                                Exchange
                            </div>
                        </div>
                        <div class="fs-sum-block">
                            <div>
                                ${profileData['0'].industry}
                            </div>
                            <div>
                                Industry
                            </div>
                        </div>
                        <div class="fs-sum-block">
                            <div>
                                ${profileData['0'].ceo}
                            </div>
                            <div>
                                CEO
                            </div>
                        </div>
                    </div>
                </div>
    `;

    variableContent = `
        <div class="sum-content" data-observe-resizes>
            <div class="sum-grid">
                <div class="grid-item grid-item-1">
                    <h2>Summary</h2>
                    <div class="fs-sum-outer">
                        <div class="fs-sum-outer-top">
                            <div class="fs-sum-row">
                                <div class="fs-sum-block">
                                    <div>
                                        ${quoteData['0'].symbol}
                                    </div>
                                    <div>
                                        Symbol
                                    </div>
                                </div>
                                <div class="fs-sum-block">
                                    <div>
                                        $${quoteData['0'].price}
                                    </div>
                                    <div>
                                        Price
                                    </div>
                                </div>
                            </div>
                            <div class="fs-sum-row">
                                <div class="fs-sum-block" style="width: 100%;">
                                    <div>
                                        ${nFormatter(quoteData['0'].sharesOutstanding, 2)}
                                    </div>
                                    <div>
                                        Shares Outstanding
                                    </div>
                                </div>
                            </div>
                            <div class="fs-sum-row">
                                <div class="fs-sum-block">
                                    <div>
                                        $${quoteData['0'].yearHigh}
                                    </div>
                                    <div>   
                                        52wk high
                                    </div>
                                </div>
                                <div class="fs-sum-block">
                                    <div>  
                                        $${quoteData['0'].yearLow}
                                    </div>
                                    <div>
                                        52wk low
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div class="fs-sum-outer-bottom">
                            <div class="fs-sum-block" style="">
                                <div>Description</div>
                                <div class="description">
                                    ${description}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--${gridItem2} -->
                ${gridItem3}
                ${ratingSection}
                <div class="grid-item grid-item-5">
                    <!-- Styles -->
                    <style>
                        #pricechart {
                        width: 100%;
                        height: 100%;
                        max-width: 100%;
                        }
                        #pricechart * {
                            transition: 0s;
                        }
                        
                        #controls {
                        overflow: hidden;
                        padding-bottom: 3px;
                        }
                    </style>
    
                    <!-- Resources -->
                    <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
                    <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
                    <script src="https://cdn.amcharts.com/lib/4/plugins/rangeSelector.js"></script>
                    <script src="https://cdn.amcharts.com/lib/4/themes/animated.js"></script>
    
                    <!-- HTML -->
                    <div id="controls"></div>
                    <div id="pricechart"></div>
                </div>
            </div>
    
            <div class="sum-content-title">
                <!-- Operating Performance -->
            </div>
            <script src="https://www.amcharts.com/lib/4/core.js"></script>
            <script src="https://www.amcharts.com/lib/4/charts.js"></script>
            <script src="https://www.amcharts.com/lib/4/themes/dark.js"></script>
            <script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
            <div class="graph-box">
                <div id="chartdiv"></div>
            </div>
        </div>
    `;
    profileRender();
}

//add summmary content to variable content div
document.querySelector('.profile-btn').addEventListener('click', profileRender);
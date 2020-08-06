import * as graphlib from '/graphs.js';
import * as APIHandler from '/apiHandler.js';

export let symbol = "AAPL";

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
    document.querySelector('.fs-search-results').innerHTML = "";
    localStorage.clear();
    localStorage.setItem('symbol', ticker);
    symbol = ticker;
    topInit();
    console.log(`New Ticker is ${ticker}`);
}
window.resultClicked = resultClicked;

let createSearchResultHTML = (companyName, ticker) => {
    let searchResult = `
            <div class="fs-search-result" onclick="resultClicked(this.children[1].innerHTML.trim()); console.log('CLICK')">
                <div>
                    ${companyName}
                </div>
                <div>
                    ${ticker}
                </div>
            </div>
    `;
    return searchResult;
}

const searchHandler = () => {
    //addEventListener => when fs-search-text is in focus, show search results
    document.querySelector('.fs-search-text').addEventListener('focus', () => {
        console.log("focus detected");
        document.addEventListener('keydown', async () => {
            console.log("keypress detected");
            if (document.querySelector('.fs-search-text').value != "") {
                console.log("value not null");
                let query = document.querySelector('.fs-search-text').value;
                let searchResultsData = await APIHandler.fetchSearchResults(query);
                // let searchResults = `<div class="fs-search-results">`;
                let searchResults = "";
                searchResultsData.forEach((el, index) => {
                    let searchResult = createSearchResultHTML(el.name, el.symbol);
                    searchResults += searchResult;
                });
                // searchResults += "</div>";
                // document.querySelector('.fs-search-box').insertAdjacentHTML('beforeend', searchResults);
                document.querySelector('.fs-search-results').innerHTML = searchResults;

            }
        });
    });
    // document.querySelector('.fs-search-text').addEventListener('focusout', () => {
    //     setTimeout(() => {
    //         document.querySelector('.fs-search-results').innerHTML = "";
    //     }, 100);
    // });


    //if search input is in focus and keypress event and fs-search-text != null
        //query = fs-search-text.value
        //query api
        //forEach result, create string to add

        //populate results (with onclick function)
    // document.querySelector('.fs-search-results').innerHTML = searchResults;
    // document.querySelector('.fs-search-box').insertAdjacentHTML('beforeend', searchResults);
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

const nFormatter = (num, digits) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "B" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const topInit = async () => {
    await getProfileData();
    await getQuoteData();
    await getRatingData();
    if (profileData['0'] != undefined) {
        let topContent = `
            <div class="fs-search-box">
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="search">
                    <path d="M8.3283 0C3.73857 0 0 3.73857 0 8.3283C0 12.918 3.73857 16.6566 8.3283 16.6566C10.3242 16.6566 12.1571 15.9479 13.5937 14.7714L18.5663 19.7439C18.643 19.8239 18.7349 19.8877 18.8366 19.9316C18.9383 19.9756 19.0478 19.9988 19.1586 20C19.2694 20.0011 19.3793 19.9801 19.4819 19.9382C19.5845 19.8963 19.6777 19.8344 19.756 19.756C19.8344 19.6777 19.8963 19.5845 19.9382 19.4819C19.9801 19.3793 20.0011 19.2694 20 19.1586C19.9988 19.0478 19.9756 18.9383 19.9316 18.8366C19.8877 18.7349 19.8239 18.643 19.7439 18.5663L14.7714 13.5937C15.9479 12.1571 16.6566 10.3242 16.6566 8.3283C16.6566 3.73857 12.918 0 8.3283 0ZM8.3283 1.66566C12.0178 1.66566 14.9909 4.63876 14.9909 8.3283C14.9909 12.0178 12.0178 14.9909 8.3283 14.9909C4.63876 14.9909 1.66566 12.0178 1.66566 8.3283C1.66566 4.63876 4.63876 1.66566 8.3283 1.66566Z"></path>
                    </svg>
                <input class="fs-search-text" placeholder="Search Companies" type="text"></input>
            </div>
            <div class="fs-search-results"></div>
            <div class="underline" style="
                border-bottom: solid rgb(233, 234, 238) 1px; 
                width: calc(100% - 50px); margin-left: 25px; top: 40px;
                position: relative;">
            </div>
            <div class="top-info">
                <div class="company-pic"></div>
                <div class="company-highlights-box">
                    <div class="company-name">${profileData['0'].companyName}</div>
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
        document.querySelector('.company-pic').style.backgroundImage = `url('${profileData['0'].image}')`;
        // searchHandler();
        // document.querySelector('.fs-search-box').insertAdjacentHTML('afterend', searchResults);
        profileInit();
        searchHandler();
    } else {
        let topContent = `
        <div class="fs-search-box">
                <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="search">
                    <path d="M8.3283 0C3.73857 0 0 3.73857 0 8.3283C0 12.918 3.73857 16.6566 8.3283 16.6566C10.3242 16.6566 12.1571 15.9479 13.5937 14.7714L18.5663 19.7439C18.643 19.8239 18.7349 19.8877 18.8366 19.9316C18.9383 19.9756 19.0478 19.9988 19.1586 20C19.2694 20.0011 19.3793 19.9801 19.4819 19.9382C19.5845 19.8963 19.6777 19.8344 19.756 19.756C19.8344 19.6777 19.8963 19.5845 19.9382 19.4819C19.9801 19.3793 20.0011 19.2694 20 19.1586C19.9988 19.0478 19.9756 18.9383 19.9316 18.8366C19.8877 18.7349 19.8239 18.643 19.7439 18.5663L14.7714 13.5937C15.9479 12.1571 16.6566 10.3242 16.6566 8.3283C16.6566 3.73857 12.918 0 8.3283 0ZM8.3283 1.66566C12.0178 1.66566 14.9909 4.63876 14.9909 8.3283C14.9909 12.0178 12.0178 14.9909 8.3283 14.9909C4.63876 14.9909 1.66566 12.0178 1.66566 8.3283C1.66566 4.63876 4.63876 1.66566 8.3283 1.66566Z"></path>
                    </svg>
                <input class="fs-search-text" placeholder="Search Companies" type="text"></input>
            </div>
            <div class="fs-search-results"></div>
            <div class="underline" style="
                border-bottom: solid rgb(233, 234, 238) 1px; 
                width: calc(100% - 50px); margin-left: 25px; top: 40px;
                position: relative;">
            </div>
        <div class="error">We are having some trouble loading this security right now. Please try another.</div>`
        document.querySelector('.top').innerHTML = topContent;
        document.querySelector('.variable-content').innerHTML = "";
        searchHandler();
    }
}
topInit();

const profileRender = () => {
    document.querySelector('.variable-content').innerHTML = variableContent;
    graphlib.createOpChart();
    graphlib.createCandlestickChart();
    graphlib.createPriceChart();
    containerQueryListener();
}
let variableContent;
const profileInit = () => {
    //algorithm to detect end of sentence and exclude periods from inc. and co.
    let descriptionList = profileData['0'].description.split(".", 10);
    let description = "";
    //.some breaks the loop when an iteration returns true
    //Stop writing the description at the end of the first sentence
    descriptionList.some((el) => {
        description += el + ".";
        return !(el.substring(el.length-3) == "Inc" || el.substring(el.length-2) == "Co"|| el.substring(el.length-4) == "Corp");
    });

    //handle rating section
    let ratingSection = "";
    if (ratingData['0'] != undefined) {
        ratingSection = `
            ${ratingData['0'].date}
            <h1>Rating</h1> - ${ratingData['0'].rating}, ${ratingData['0'].ratingRecommendation}
            Overall: ${ratingData['0'].ratingScore}
            DCF Score: ${ratingData['0'].ratingDetailsDCFScore}
            DCF Recommendation: ${ratingData['0'].ratingDetailsDCFRecommendation}
            DE Score: ${ratingData['0'].ratingDetailsDEScore}
            DE Recommendation: ${ratingData['0'].ratingDetailsDERecommendation}
            PB Score: ${ratingData['0'].ratingDetailsPBScore}
            PB Recommendation: ${ratingData['0'].ratingDetailsPBRecommendation}
            PE Score: ${ratingData['0'].ratingDetailsPEScore}
            PE Recommendation: ${ratingData['0'].ratingDetailsPERecommendation}
            ROA Score: ${ratingData['0'].ratingDetailsROAScore}
            ROA Recommendation: ${ratingData['0'].ratingDetailsROARecommendation}
            ROE Score: ${ratingData['0'].ratingDetailsROEScore}
            ROE Recommendation: ${ratingData['0'].ratingDetailsROERecommendation}
        `;
    } else {
        ratingSection = "Rating data is not yet available for this security."
    }
    variableContent = `
        <div class="sum-content" data-observe-resizes>
            <div class="sum-grid">
                <div class="grid-item grid-item-1">
                    Symbol: ${quoteData['0'].symbol}
                    Price: ${quoteData['0'].price}
                    Shares Outstanding: ${quoteData['0'].sharesOutstanding}
                    52wk high: ${quoteData['0'].yearHigh}
                    52wk low: ${quoteData['0'].yearLow}
                </div>
                <div class="grid-item grid-item-2">
                    <h1>Description</h1>
                    ${description}
                </div>
                <div class="grid-item grid-item-3">
                    lastDiv: ${profileData['0'].lastDiv}
                    Beta: ${profileData['0'].beta}
                    volAvg: ${profileData['0'].volAvg}
                    Exchange: ${profileData['0'].exchange}
                    Industry: ${profileData['0'].industry}
                    Sector: ${profileData['0'].sector}
                    CEO: ${profileData['0'].ceo}
                </div>
                <div class="grid-item grid-item-4">
                    ${ratingSection}
                </div>
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
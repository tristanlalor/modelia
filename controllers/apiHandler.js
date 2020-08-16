const apiKey = "fe92325136d390238534104e6c91668f";

export const generalFetch = async (dataset, ticker, period) => {
  let query;
  if (period) {
    query = `https://financialmodelingprep.com/api/v3/${dataset}/${ticker}?${period}&apikey=${apiKey}`;
  } else {
    query = `https://financialmodelingprep.com/api/v3/${dataset}/${ticker}?apikey=${apiKey}`;
  }
  try {
    const result = await fetch(query);
    const data = await result.json();
    return data;
  } catch (error){
    console.log(`SERVER ERROR: ${error}`);
  }
}

export const fetchSearchResults = async (query) => {
  const result = await fetch(`https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&apikey=${apiKey}`);
  const data = await result.json();
  return data;
}
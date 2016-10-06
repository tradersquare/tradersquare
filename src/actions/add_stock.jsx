import axios from 'axios';

export const ADD_STOCK = "ADD_STOCK";

export default function(stock, watchlistData) {
  // debugger;
  let insideWatchlist = true;
  watchlistData.forEach( v => {
    if (v.ticker === stock.ticker) {
      insideWatchlist = false;
    }
  })

  if (insideWatchlist) {
    const addToDB = axios.post('/addToWatchlist', {
      userExtId: 45,
      StockTicker: stock.ticker,
      StockName: stock.name,
      ClosingPrice: stock.close_price
    })
      .then( () => {
        console.log('went through, now do get req'));
      }
  }


  return {
    type: ADD_STOCK,
    payload: stock
  };
}

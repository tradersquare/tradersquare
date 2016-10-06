import axios from 'axios';

export const ADD_STOCK = "ADD_STOCK";

export default function(stock, watchlistData) {
  // debugger;
  let notInsideWatchlist = true;
  watchlistData.forEach( v => {
    if (v.ticker === stock.ticker) {
      insideWatchlist = false;
    }
  })
  debugger;

  if (notInsideWatchlist) {
    const addToDB = axios.post('/addToWatchlist', {
      userExtId: 45,
      StockTicker: stock.ticker,
      StockName: stock.name,
      ClosingPrice: stock.close_price
    })
      .then( () => {
        debugger;
        console.log('went through, now do get req');
        getUpdatedRows();
      })
  }

  function getUpdatedRows() {
    const allRows = axios.get('/getFromWatchList')
      .then( () => {
        debugger;
        // return {
        //   type: ADD_STOCK,
        //   payload: allRows
        // }
      })
  }
}

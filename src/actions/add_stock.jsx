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
  // debugger;
  var allRows = '';
  if (notInsideWatchlist) {
    var addToDB = axios.post('/addToWatchlist', {
      userExtId: 45,
      StockTicker: stock.ticker,
      StockName: stock.name,
      ClosingPrice: stock.close_price
    })
      .then( () => {
        debugger;
        console.log('went through, now do get req');
        return getUpdatedRows();
      })
  }
  // getUpdatedRows();
  function getUpdatedRows() {
    return axios.get('/getFromWatchList')
      // .then( () => {
      //   console.log('allRows returned: ', allRows);
      //   debugger;
      //   // return {
      //   //   type: ADD_STOCK,
      //   //   payload: allRows
      //   // }
      // })
  }

  return {
    type: ADD_STOCK,
    payload: addToDB
  }

}

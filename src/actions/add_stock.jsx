import axios from 'axios';

export const ADD_STOCK = "ADD_STOCK";

export default function(stock, watchlistData, userID) {
  // debugger;

  //add logic: if not logged in, take to login page
  //otherwise, do below stuff
  //after login, populate state using login action?

  let notInsideWatchlist = true;
  watchlistData.forEach( v => {
    if (v.ticker === stock.ticker) {
      notInsideWatchlist = false;
    }
  })

  let stringedUID = `'${userID}'`;

  if (notInsideWatchlist) {
    var addToDB = axios.post('/addToWatchlist', {
      userExtId: stringedUID,
      StockTicker: stock.ticker,
      StockName: stock.name,
      ClosingPrice: stock.close_price
    })
      .then( () => {
        // debugger;
        console.log('went through, now do get req');
        return getUpdatedRows();
      })
  }

  function getUpdatedRows() {
    return axios.get('/getFromWatchList'. {
      userExtId: stringedUID
    })
      // .then( () => {
      //   debugger;
      // })
  }

  return {
    type: ADD_STOCK,
    payload: addToDB
  }

}

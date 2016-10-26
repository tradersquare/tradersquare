import axios from 'axios';

export const ADD_STOCK = "ADD_STOCK";

export default function(stock, watchlistData, userID, initialLoad) {

  let notInsideWatchlist = true;
  if (stock) {
    watchlistData.forEach( v => {
      if (v.ticker === stock.ticker) {
        notInsideWatchlist = false;
      }
    })
  }

  let stringedUID = `'${userID}'`;

  if (notInsideWatchlist && initialLoad) {
    var addToDB = getUpdatedRows(stringedUID);
  } else if (notInsideWatchlist) {
    var addToDB = axios.post('/addToWatchlist', {
      userExtId: stringedUID,
      StockTicker: stock.ticker,
      StockName: stock.name,
      ClosingPrice: stock.close_price
    })
      .then( () => {
        // debugger;
        console.log('went through, now do get req');
        return getUpdatedRows(stringedUID);
      })
  }

  function getUpdatedRows(stringedUID) {
    return axios.get('/getFromWatchList', {
      params: {
        userExtId: stringedUID
      }
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

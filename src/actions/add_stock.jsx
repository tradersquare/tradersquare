import axios from 'axios';

export const ADD_STOCK = "ADD_STOCK";

export default function(stock) {
  console.log('add_stock action: ', stock);

  const addToDB = axios.post('/addToWatchlist', {
      username: 'akul',
      ticker: stock.ticker,
      stockName: stock.name
    })
    .then(console.log('went through'));


  return {
    type: ADD_STOCK,
    payload: stock
  };
}

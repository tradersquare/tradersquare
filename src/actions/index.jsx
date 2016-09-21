import axios from 'axios';
import WatchlistAdd from './watchlist_Add';

export const GET_DATA = 'GET_DATA';
export const GET_STRAT = 'GET_STRAT';


export function getData() {
  // const request = axios.get('/moreStocks')
  let serverReq = axios.post('/stockData', {"ticker": "FB"})
  .then(function(res) {
    console.log('res::::: ',res);
  })
  .catch(function(err) {
    console.log('errrrrrrr', err);
  });
  return {
    type: GET_DATA,
    payload: request
  };
}
/*
export function searchStockData() {
  let postReq = new Promise(
    function(resolve, reject) {
      let serverReq = axios.post('/stockData', {"ticker": "FB"})
      .then(function(res) {
        // console.log('res::::: ',res);
        const postData = res;
      })
      .catch(function(err) {
        console.log('errrrrrrr', err);
      });
      console.log('search my nodes', serverReq);
    }
  )

  postReq.then(
  return {
    type: GET_DATA,
    payload: postData
  }
 );


 // .then(function(res) {
 //   console.log('res::::: ',res);
 // })
 // .catch(function(err) {
 //   console.log('errrrrrrr', err);
 // });


 */




export function searchStockData() {

  let serverReq = axios.get(`/stockData/FB`)

  // console.log('search my nodes', serverReq);

  return {
    type: GET_DATA,
    payload: serverReq
  };
  //get request to server goes here

  //return {
  //}
}

import axios from 'axios';

export const ADD = "ADD";
export const GET_STRAT_DATA = "GET_STRAT_DATA";

export default function(metric = "") {

  return axios.get(`/getDataDB`).then((data) => {
  	const results = {
  		data: data.data,
  		metric: metric
  	}
  	console.log(results)
	  return {
	    type: GET_STRAT_DATA,
	    payload: results
	  };
  });

}

import {GET_FILTERED_DATA} from '../actions/get_db_data_filtered';

export default function(state = [], action) {
  console.log('hello in filter_reducer');
  switch(action.type) {
    case GET_FILTERED_DATA:
      return action.payload.data;
    default: return state
      }
    }

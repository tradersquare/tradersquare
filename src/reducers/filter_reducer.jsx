import {GET_FILTERED_DATA} from '../actions/get_db_data_filtered';

export default function(state = [], action) {
  switch(action.type) {
    case GET_FILTERED_DATA:
      return action.payload.data || state;
    default: return state
      }
    }

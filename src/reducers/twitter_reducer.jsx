import {GET_TWITTER_DATA} from '../actions/get_twitter_data';

export default function(state=[], action) {
  switch(action.type) {
    case GET_TWITTER_DATA:
      return action.payload.data;
    default: return state
  }
}

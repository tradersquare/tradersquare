import {GET_STRAT_DATA} from '../actions/get_strat_data';

const INITIAL_STRAT_STATE = { all: [], post: null };

export default function(state = INITIAL_STRAT_STATE, action) {
  switch(action.type) {
    case GET_STRAT_DATA:
      console.log(action.payload.data, 'strat data')
      return action.payload.data;
  }

  return null;
}

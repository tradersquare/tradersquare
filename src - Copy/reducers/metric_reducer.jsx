import {GET_STRAT_DATA} from '../actions/get_strat_data';

const INITIAL_STRAT_STATE = { all: [], post: null };

export default function(state = INITIAL_STRAT_STATE, action) {
  switch(action.type) {
    case GET_STRAT_DATA:
      return action.payload.metric;
  }

  return null;
}

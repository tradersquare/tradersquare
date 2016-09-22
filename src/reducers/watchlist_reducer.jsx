import {GET_STRAT_DATA} from '../actions/watchlist_Add';

const INITIAL_STRAT_STATE = { all: [], post: null};

export default function(state = INITIAL_STRAT_STATE, action) {
  switch(action.type) {
    case GET_STRAT_DATA:
      console.log(action.payload, 'strat data')
      return ([
        {title: action.payload},
        {title: 'JS'},
        {title: 'PY'}
      ])
  }

  return ([
    {title: 'HP'},
    {title: 'JS'},
    {title: 'PY'}
  ])
}

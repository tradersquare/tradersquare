import {GET_STRAT} from '../actions/index';

export default function(state, action) {
  switch(action.type) {
    case(GET_STRAT):
      return([
        {title: 'HP'},
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

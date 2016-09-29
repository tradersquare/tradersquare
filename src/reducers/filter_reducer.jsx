import {GET_FILTERED_DATA} from '../actions/get_db_data_filtered';

const INITIAL_FILTERED_STATE = { all: [], post: null };

export default function(state = INITIAL_FILTERED_STATE, action) {
  switch(action.type) {
    case GET_FILTERED_DATA:
      console.log(action.payload.data, 'filtered data')
      return action.payload.data;
  }

  return ([
    {title: 'HP'},
    {title: 'JS'},
    {title: 'PY'}
  ])
}

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import lists from './list';

export default history =>
  combineReducers({
    router: connectRouter(history),
    lists,
  });

import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';
import history from './history';

const logger = createLogger({ diff: true });
const router = routerMiddleware(history);

const middleware = process.env.NODE_ENV === 'development' ? [router, logger] : [router];

const store = configureStore({
  reducer: createRootReducer(history),
  middleware,
});

export default store;

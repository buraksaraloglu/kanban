import 'core-js/shim';
import 'regenerator-runtime/runtime';
import 'normalize.css/normalize.css';

import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import NotFound from './pages/NotFound';
import store from './redux/store';
import history from './redux/history';

import styles from './styles.module.scss';

const Board = lazy(() => import('./pages/Board'));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.App}>
          <Switch>
            <Route exact path="/" render={() => <Board />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </div>
      </Suspense>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react'),
);

if (module.hot) {
  module.hot.accept();
}

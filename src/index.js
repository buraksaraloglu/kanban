import 'core-js/shim';
import 'regenerator-runtime/runtime';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import NotFound from './pages/NotFound';
import store from './redux/store';
import history from './redux/history';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Suspense fallback={null}>
        <Switch>
          <Route render={() => <NotFound />} />
        </Switch>
      </Suspense>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react'),
);

if (module.hot) {
  module.hot.accept();
}

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app.jsx';
import Store from './components/store.jsx';

export default(
  <Route path="/" component={App} >
    <IndexRoute component={Store} />
  </Route>
);

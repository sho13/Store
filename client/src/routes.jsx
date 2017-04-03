import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app.jsx';
import index from './components/index.jsx'

export default(
  <Route path="/" component={App} >
    <IndexRoute component={index} />
  </Route>
);

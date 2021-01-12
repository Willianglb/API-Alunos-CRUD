import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import StoreProvider from 'components/Store/Provider';
import RoutesPrivate from 'components/Routes/Private/Private';
import Home from './Home/Home';
import Login from './Login/Login';
import List from './List/List';

const PagesRoot = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route exact path="/" component={Login} />
        <RoutesPrivate exact path="/home" component={Home} />
        <RoutesPrivate exact path={['/list', '/list/:id']} component={List} />
      </Switch>
    </StoreProvider>
  </Router>
);


export default PagesRoot;

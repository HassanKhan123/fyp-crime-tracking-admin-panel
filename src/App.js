import React from 'react';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './DemoPages/Dashboards';
import Login from './DemoPages/UserPages/Login';
import './assets/base.scss';


const App = () => {
  return (
    <BrowserRouter>
      <Route path='/' exact component={Login} />
      <Route path='/dashboard' component={Dashboard} />
    </BrowserRouter>
  );
};

export default App;

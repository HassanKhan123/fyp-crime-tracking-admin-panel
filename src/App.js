import React, { Suspense } from 'react';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import Loader from 'react-loaders';

import './assets/base.scss';
import './main.css';
const Users = React.lazy(() => import('./DemoPages/Dashboards/Users'));
const Officers = React.lazy(() => import('./DemoPages/Dashboards/Officers'));
const Dashboard = React.lazy(() => import('./DemoPages/Dashboards'));
const Login = React.lazy(() => import('./DemoPages/UserPages/LoginBoxed'));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className='h-100 bg-plum-plate bg-animation'>
          <div className='loading loader-wrapper d-flex h-100 justify-content-center align-items-center text-center'>
            <Loader type='ball-pulse' />
          </div>
        </div>
      }
    >
      <BrowserRouter>
        <Route path='/' exact component={Login} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/users' component={Users} />
        <Route path='/officers' component={Officers} />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;

import React, { Suspense } from 'react';
import { HashRouter, BrowserRouter, Switch, Route } from 'react-router-dom';
import Loader from 'react-loaders';

import './assets/base.scss';
import './main.css';
const Dashboard = React.lazy(() => import('./DemoPages/Dashboards'));
const Login = React.lazy(() => import('./DemoPages/UserPages/LoginBoxed'));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className='h-100 bg-plum-plate bg-animation'>
          <div className='loader loader-wrapper d-flex h-100 justify-content-center align-items-center text-center'>
            <Loader type='ball-pulse' />
          </div>
        </div>
      }
    >
      <BrowserRouter>
        <Route path='/' exact component={Login} />
        <Route path='/dashboard' component={Dashboard} />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;

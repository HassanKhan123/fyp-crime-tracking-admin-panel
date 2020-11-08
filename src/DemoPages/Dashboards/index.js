import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import AppHeader from '../../Layout/AppHeader/';
// import AppSidebar from '../../Layout/AppSidebar/';
// import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Dashboards = ({ match }) => (
  <Fragment>
    <ThemeOptions />
    <AppHeader />
    <div className='app-main'>
      <div className='app-main__outer'>
        <div className='app-main__inner'></div>
      </div>
    </div>
  </Fragment>
);

export default Dashboards;

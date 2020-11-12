import React, { Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DoughnutExample from '../doughnut';
import PieExample from '../pie';
import DynamicDoughnutExample from '../dynamicDoughnut';
import RadarExample from '../radar';
import PolarExample from '../polar';

import { Row, Col, Card, CardBody, CardTitle, Container } from 'reactstrap';

export default class ChartJsCircular extends React.Component {
  render() {
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component='div'
          transitionName='TabsAnimation'
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          
           
                <Card className='main-card mb-3 mr-4'>
                  <CardBody>
                   
                    <PieExample data={this.props.data} />
                  </CardBody>
                </Card>
             
         
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

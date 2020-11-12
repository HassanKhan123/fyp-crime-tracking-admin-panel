import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle, Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import CountUp from 'react-countup';

import {
    faAngleUp,
    faArrowLeft,
    faEllipsisH,

} from '@fortawesome/free-solid-svg-icons';

import bg1 from '../../../assets/utils/images/dropdown-header/abstract1.jpg';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import PageTitle from '../../../Layout/AppMain/PageTitle';

class CountUpExample extends Component {

    render() {

        return (
            <Fragment>
                
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    
                    
                            <div className="card mb-3 widget-chart">
                               
                                <div className="icon-wrapper rounded-circle">
                                    <div className="icon-wrapper-bg bg-success"/>
                                    <i className="lnr-screen text-success"/>
                                </div>
                                <div className="widget-numbers">
                                    <CountUp start={0}
                                             end={this.props.data.length}
                                             separator=""
                                             decimals={0}
                                             decimal=","
                                             prefix=""
                                             useEasing={true}
                                             
                                             duration="5"/>
                                </div>
                                <div className="widget-subheading">
                                    Total Number of Crimes Reported
                                </div>
                                
                            </div>
                        
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
};

export default CountUpExample;
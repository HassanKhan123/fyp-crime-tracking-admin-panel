import React, { Component, Fragment } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  Row,
  Col,
  Card,
  CardBody,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  ListGroup,
  ListGroupItem,
  Dropdown,
  ButtonGroup,
  CardHeader,
  CustomInput,
  CardFooter,
  Button,
  Input,
  Container,
} from 'reactstrap';

import PerfectScrollbar from 'react-perfect-scrollbar';

import CountUp from 'react-countup';

import { Progress } from 'react-sweet-progress';

import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../../assets/utils/images/avatars/4.jpg';
import avatar5 from '../../../../assets/utils/images/avatars/5.jpg';
import avatar6 from '../../../../assets/utils/images/avatars/8.jpg';

import {
  faTrashAlt,
  faCheck,
  faEllipsisH,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ListGroupExampleAdvanced extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cSelected: [],
    };
  }

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
          <Container fluid>
            <Row>
              <Col lg='6' style={{ paddingLeft: 0 }}>
                <Card className='main-card mb-3'>
                  <ListGroup flush>
                    {this.props.users.map((user) => (
                      <ListGroupItem>
                        <div className='widget-content p-0'>
                          <div className='widget-content-wrapper'>
                            <div className='widget-content-left mr-3'>
                              <img
                                width={42}
                                className='rounded-circle'
                                src={avatar1}
                                alt=''
                              />
                            </div>
                            <div className='widget-content-left'>
                              <div className='widget-heading'>
                                {user.userName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}

export default ListGroupExampleAdvanced;

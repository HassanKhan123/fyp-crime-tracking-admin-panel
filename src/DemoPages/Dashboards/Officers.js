import React, { Fragment, Component } from 'react';
import { Route } from 'react-router-dom';
import Loader from 'react-loaders';
import moment from 'moment';
import GoogleMapReact from 'google-map-react';
import dotenv from 'dotenv';

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  ButtonGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
} from 'reactstrap';

import firebase from 'firebase/firestore';
import AppHeader from '../../Layout/AppHeader/';
// import Maps from '../../DemoPages/Components/Maps/Examples/GoogleMaps';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';
import fire from '../../config/firebaseConfig';
import SideBar from '../../Layout/AppSidebar';
import ListGroup from '../Elements/ListGroup/Examples/Advanced';

dotenv.config();

class Officers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
    };
  }

  async componentDidMount() {
    try {
      await fire
        .firestore()
        .collection('Officers')
        .onSnapshot((snap) => {
          let usersArr = [];
          snap.forEach((doc) => {
            usersArr.push(doc.data());
          });
          this.setState({
            users: usersArr,
            loading: false,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { loading, users } = this.state;
    return (
      <Fragment>
        <ThemeOptions />
        <AppHeader />

        <div className='app-main'>
          <SideBar />
          <div className='app-main__outer'>
            <div className='app-main__inner'>
              {loading ? (
                <div className='loading loader-wrapper h-100'>
                  <Loader type='ball-pulse' />
                </div>
              ) : (
                <>
                  <h1>Officers</h1>
                {users.length > 0 ? <ListGroup users={users} /> : <h6 className="text-center">No Officers</h6>}  
                </>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Officers;

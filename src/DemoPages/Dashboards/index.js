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
import Modal from '../Components/Modal/Examples/ModalCustomCloseButton';
import Chart from '../Charts/ChartJs/Examples/Circular/index';
import Graph from '../Components/CountUp';

dotenv.config();
const AnyReactComponent = ({ text }) => <div>{text}</div>;
const MarkerComponent = () => (
  <div>
    <img
      src={require('../../assets/marker.png')}
      alt='logo'
      width='25'
      height='25'
    />
  </div>
);

class Dashboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: [],

      zoom: 15,
      openModal: false,
      officersLocation: [],
    };
  }

  async componentDidMount() {
    try {
      await fire
        .firestore()
        .collection('allAlerts')
        .onSnapshot((snap) => {
          if (!snap.empty) {
            let postsArr = [];
            snap.forEach(async (doc) => {
              console.log(doc.data());
              if (doc.data().acknowledged.acknowledgedById) {
                await fire
                  .firestore()
                  .collection('Officers')
                  .doc(doc.data().acknowledged.acknowledgedById)
                  .onSnapshot((snap) => {
                    let arr = [];

                    arr.push(snap.data());

                    this.setState({ officerLocation: arr });
                    let obj = doc.data();
                    obj.officer = snap.data();
                    console.log(obj);
                    postsArr.push(obj);
                    this.setState({
                      posts: postsArr,
                      loading: false,
                    });
                  });
              } else {
                postsArr.push(doc.data());
                this.setState({
                  posts: postsArr,
                  loading: false,
                });
              }
            });
          } else {
            this.setState({
              loading: false,
            });
          }
        });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }
  toggle = () => {
    const { openModal } = this.state;
    this.setState({
      openModal: !openModal,
    });
  };
  render() {
    const {
      loading,
      posts,
      center,
      zoom,
      openModal,
      officerLocation,
    } = this.state;
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
                  <h1>Recent Activities</h1>

                  <Row>
                    {posts.length > 0 ? (
                      posts.map((post, index) => (
                        <Col md='6' key={index}>
                          <Card className='main-card mb-3'>
                            <CardHeader>
                              {post.location.regionName[0].street
                                ? post.location.regionName[0].street
                                : post.location.regionName[0].name}
                              , {post.location.regionName[0].city},{' '}
                              {post.location.regionName[0].region}
                            </CardHeader>
                            <CardBody>
                              <p>
                                Author:{' '}
                                <span className='font-weight-bold'>
                                  {post.userName}
                                </span>{' '}
                              </p>
                              <p>
                                Date:
                                <span className='font-weight-bold'>
                                  {' '}
                                  {moment(post.createdAt.toDate()).format(
                                    'MMMM Do YYYY, h:mm A'
                                  )}
                                </span>
                              </p>
                              <p className='mb-3'>
                                {post.ReportDesc ? (
                                  'Description: ' + post.ReportDesc.description
                                ) : (
                                  <br />
                                )}
                              </p>
                              {openModal &&
                                this.state.index === index &&
                                post.acknowledged.acknowledgedStatus && (
                                  <Modal
                                    openModal={openModal}
                                    toggle={this.toggle}
                                    post={post}
                                    // lat={post.location.marker_lat}
                                    // long={post.location.marker_long}
                                    // title={post.acknowledged.acknowledgedByName}
                                    // officerInfo={post.officer}
                                    // post={post.acknowledged.acknowledgedById}
                                  />
                                )}
                              <div style={{ height: '40vh', width: '100%' }}>
                                <GoogleMapReact
                                  defaultCenter={{
                                    lat: post.location.marker_lat,
                                    lng: post.location.marker_long,
                                  }}
                                  center={{
                                    lat: post.location.marker_lat,
                                    lng: post.location.marker_long,
                                  }}
                                  defaultZoom={zoom}
                                  bootstrapURLKeys={{
                                    key: process.env.REACT_APP_GOOGLE_API_KEY,
                                  }}
                                >
                                  <AnyReactComponent
                                    lat={post.location.marker_lat}
                                    lng={post.location.marker_long}
                                    text={<MarkerComponent />}
                                  />
                                </GoogleMapReact>
                              </div>
                            </CardBody>
                            <CardFooter className='d-block'>
                              {post.acknowledged.acknowledgedStatus ? (
                                <div className='card-lower'>
                                  <p className='acknowledged'>
                                    Acknowledged By{' '}
                                    {post.acknowledged.acknowledgedByName} at{' '}
                                    {moment(
                                      post.acknowledged.acknowledgedAt.toDate()
                                    ).format('MMMM Do, YYYY, h:mm A')}
                                  </p>
                                  <Button
                                    color='primary'
                                    onClick={() =>
                                      this.setState({ openModal: true, index })
                                    }
                                  >
                                    View on map
                                  </Button>
                                </div>
                              ) : (
                                <p className='not-acknowledged'>
                                  Not Acknowledged
                                </p>
                              )}

                              {/*    */}
                            </CardFooter>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <h3 className='text-center d-flex justify-content-center align-items-center m-auto'>
                        No Recent Activities
                      </h3>
                    )}
                  </Row>

                  <h1>Crime Record</h1>
                  <div style={{ display: 'flex' }}>
                    <Chart data={posts} />
                    <Graph data={posts} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Dashboards;

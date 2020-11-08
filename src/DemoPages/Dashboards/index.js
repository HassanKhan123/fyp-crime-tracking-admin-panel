import React, { Fragment, Component } from 'react';
import { Route } from 'react-router-dom';
import Loader from 'react-loaders';
import moment from 'moment';
import GoogleMapReact from 'google-map-react';

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
    };
  }

  async componentDidMount() {
    try {
      const res = await fire
        .firestore()
        .collection('allAlerts')
        .onSnapshot((snap) => {
          let postsArr = [];
          snap.forEach((doc) => {
            postsArr.push(doc.data());
          });
          this.setState({
            posts: postsArr,
            loading: false,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { loading, posts, center, zoom } = this.state;
    return (
      <Fragment>
        <ThemeOptions />
        <AppHeader />

        <div className='app-main'>
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
                              {post.location.regionName[0].street &&
                                post.location.regionName[0].street}
                              , {post.location.regionName[0].city},{' '}
                              {post.location.regionName[0].region}
                            </CardHeader>
                            <CardBody>
                              <p>
                                By{' '}
                                <span className='font-weight-bold'>
                                  {post.userName}
                                </span>{' '}
                                at{' '}
                                <span className='font-weight-bold'>
                                  {' '}
                                  {moment(post.createdAt.toDate()).format(
                                    'MMMM Do YYYY, h:mm A'
                                  )}
                                </span>
                              </p>
                              <p className='mb-3'>
                                {post.ReportDesc ? (
                                  post.ReportDesc.description
                                ) : (
                                  <br />
                                )}
                              </p>
                              <div style={{ height: '40vh', width: '100%' }}>
                                <GoogleMapReact
                                  defaultCenter={{
                                    lat: post.location.marker_lat,
                                    lng: post.location.marker_long,
                                  }}
                                  defaultZoom={zoom}
                                  bootstrapURLKeys={{
                                    key:
                                      'AIzaSyCSaYM3yMTr_62MGc8TGbisrFZqLREDB3E',
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
                            {/*    <CardFooter className='d-block text-right'></CardFooter> */}
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <h3 className='text-center d-flex justify-content-center align-items-center m-auto'>
                        No Recent Activities
                      </h3>
                    )}
                  </Row>
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

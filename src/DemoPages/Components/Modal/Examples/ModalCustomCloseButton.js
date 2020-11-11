import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import GoogleMapReact, { Polyline } from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const MarkerComponent = () => (
  <div>
    <img
      src={require('../../../../assets/marker.png')}
      alt='logo'
      width='25'
      height='25'
    />
  </div>
);

const MarkerComponent2 = () => (
  <div>
    <img
      src={require('../../../../assets/car.png')}
      alt='logo'
      width='35'
      height='35'
    />
  </div>
);
class ModalCustomCloseButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
    };
  }

  render() {
    const { zoom } = this.state;
    console.log(this.props.officerInfo);
    const closeBtn = (
      <button className='close' onClick={this.props.toggle}>
        &times;
      </button>
    );

    return (
      <span className='d-inline-block mb-2 mr-2'>
        <Modal
          isOpen={this.props.openModal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle} close={closeBtn}>
            {this.props.title} is heading towards the crime spot
          </ModalHeader>
          <ModalBody>
            <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                defaultCenter={{
                  lat: this.props.lat,
                  lng: this.props.long,
                }}
                center={{
                  lat: this.props.lat,
                  lng: this.props.long,
                }}
                defaultZoom={zoom}
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_API_KEY,
                }}
              >
                <AnyReactComponent
                  lat={this.props.lat}
                  lng={this.props.long}
                  text={<MarkerComponent />}
                />
                <AnyReactComponent
                  lat={this.props.officerInfo[0].location.marker_lat}
                  lng={this.props.officerInfo[0].location.marker_long}
                  text={<MarkerComponent2 />}
                />
              </GoogleMapReact>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='link' onClick={this.props.toggle}>
              Cancel
            </Button>
            <Button color='primary' onClick={this.props.toggle}>
              Do Something
            </Button>{' '}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default ModalCustomCloseButton;

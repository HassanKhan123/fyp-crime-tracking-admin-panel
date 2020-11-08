import React, { Component, Fragment } from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Loader from 'react-loaders';
import firebase from 'firebase/app';
import 'firebase/auth';

import fire from '../../../config/firebaseConfig';
import SweetAlert from 'sweetalert-react';

// Layout

class LoginBoxed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      showAlert: false,
      error: '',
      pageLoading: true,
    };
  }
  async componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.history.push('/dashboard');

        this.setState({ loading: false, pageLoading: false });
      } else {
        this.setState({ loading: false, pageLoading: false });
      }
    });
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  submitHandler = async (e) => {
    this.setState({ loading: true });
    const { email, password } = this.state;
    e.preventDefault();
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(res.additionalUserInfo);
      this.setState({ loading: false });
      this.props.history.push('/dashboard');
    } catch (error) {
      console.log(error);
      this.setState({ loading: false, showAlert: true, error: error.message });
    }
  };

  render() {
    const {
      email,
      password,
      loading,
      showAlert,
      error,
      pageLoading,
    } = this.state;
    return (
      <Fragment>
        <SweetAlert
          title='Error!'
          confirmButtonColor=''
          show={showAlert}
          text={error}
          type='error'
          onConfirm={() => this.setState({ showAlert: false })}
        />
        {pageLoading ? (
          <div className='loading loader-wrapper h-100 d-flex justify-content-center align-items-center m-auto'>
            <Loader type='ball-pulse' />
          </div>
        ) : (
          <div className='h-100 bg-plum-plate bg-animation'>
            <div className='d-flex h-100 justify-content-center align-items-center text-center'>
              <Col md='8' className='mx-auto app-login-box'>
                <div className='modal-dialog w-100 mx-auto'>
                  <div className='modal-content'>
                    <div className='modal-body'>
                      <div className='h5 modal-title text-center'>
                        <h4 className='mt-2'>
                          <div>Welcome back, Admin</div>
                          <span>Please sign in to your account below.</span>
                        </h4>
                      </div>
                      <Form>
                        <Row form>
                          <Col md={12}>
                            <FormGroup>
                              <Input
                                type='email'
                                name='email'
                                id='exampleEmail'
                                placeholder='Email here...'
                                value={email}
                                onChange={this.changeHandler}
                              />
                            </FormGroup>
                          </Col>
                          <Col md={12}>
                            <FormGroup>
                              <Input
                                type='password'
                                name='password'
                                id='examplePassword'
                                placeholder='Password here...'
                                value={password}
                                onChange={this.changeHandler}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                    <div className='modal-footer clearfix'>
                      {loading ? (
                        <div className='loader-wrapper d-flex justify-content-center align-items-center m-auto'>
                          <Loader type='ball-pulse' />
                        </div>
                      ) : (
                        <div className='float-right'>
                          <Button
                            color='primary'
                            size='lg'
                            onClick={this.submitHandler}
                          >
                            Login to Dashboard
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Col>{' '}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default LoginBoxed;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }

  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then((result) => {
      localStorage.setItem('skincareToken', result.data.token);
      this.setState({ success: true });
      this.props.updateUser();
    }).catch((error) => {
      console.log('error returned', error.response.data);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    });
  }

  render() {
    let form = '';
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    else {
      form = (<form onSubmit={this.handleSubmit}>
                <h1>
                  <img src="/img/three-products.png" alt="Products icon" className="title-image" /> 
                  Login
                </h1>
                <div className="flex-form">
                <label for="email">
                    <p>Email</p>
                    <input name="Email"
                        id="email" 
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                </label>
                <label for="password">
                  <p>Password</p>
                  <input name="Password"
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                  />
                </label>
                <input type="submit" value="Login" />
                </div>         
              </form>);
    }
    return (
      <div>
        {form}
      </div>
    );
  }
}

export default Login;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import threeproducts from '../img/three-products.png';

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('skincareToken', result.data.token);
      this.props.updateUser();
    }).catch(error => {
      console.log(error.response);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    })
  }

  render() {
    let form = '';
    if(this.props.user){
      return (<Redirect to="/profile" />);
    }
    else {
      form = (<form onSubmit={this.handleSubmit}>
                <h1>
                  <img src={threeproducts} alt="Products icon" className="title-image" /> 
                  Signup
                </h1>
                <div className="flex-form">
                  <label for="name">
                    <p>Name</p>
                    <input name="Name"
                      id="name"
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleNameChange}
                    />
                  </label>
                  <label for="email">
                    <p>Email</p>
                    <input name="Email"
                      id="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleEmailChange} />
                  </label>
                  <label for="password">
                    <p>Password</p>
                    <input name="Password"
                      id="password"
                      placeholder="Password"
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePasswordChange} />
                  </label>
                  <input type="submit" value="Sign Up" />
                </div>
              </form>);
    }
    return (
      <div>
        {form}
        {this.props.user ? <Redirect to="/profile" /> : ''}
      </div>
    );
  }
}

export default Signup;

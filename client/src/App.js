import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import axios from 'axios';

// Layout elements
import Flash from './layout/Flash.js';
import Footer from './layout/Footer.js';
import Nav from './layout/Nav.js';

// Page routes
import Home from './Home.js';
import Products from './products/Products.js';
import Search from './products/Search.js';

// Auth routes
import Login from './auth/Login.js';
import Profile from './Profile.js';
import Signup from './auth/Signup.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }
  }
  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    // If there is a token in localStorage
    let token = localStorage.getItem('skincareToken');
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('skincareToken');
      this.setState({
        token: '',
        user: null
      });
    } else {
      //   Validate the token against the server
      axios.post('/auth/me/from/token', {
        token: token
      }).then(response => {
        //   Store the token and user
        localStorage.setItem('skincareToken', response.data.token);
        this.setState({
          token: response.data.token,
          user: response.data.user
        });
        //   Pass User into child components and display main app
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log('cdm', err);
        this.setState({
          token: '',
          user: null
        });
      })
    }
  }

  setFlash = (t, msg) => {
    this.setState({
      flash: msg,
      flashType: t
    });
  }

  cancelFlash = () => {
    this.setState({
      flash: '',
      flashType: ''
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav user={this.state.user} updateUser={this.getUser} />
            <div className="space">
              <Flash flashType={this.state.flashType} flash={this.state.flash} setFlash={this.setFlash} cancelFlash={this.cancelFlash} />
              <Route exact path="/" component={Home} />
              <Route path="/login" component={
                  () => (<Login user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/signup" component={
                  () => (<Signup user={this.state.user} setFlash={this.setFlash} updateUser={this.getUser} />)} />
              <Route path="/profile" component={
                  () => (<Profile user={this.state.user} setFlash={this.setFlash} />)} />
              <Route path="/search" component={
                  () => (<Search user={this.state.user} setFlash={this.setFlash} />)} />
              <Route path="/products" component={
                  () => (<Products user={this.state.user} setFlash={this.setFlash} />)} />
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

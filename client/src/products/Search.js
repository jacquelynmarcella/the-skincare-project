import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import FA from 'react-fontawesome';

import Results from './Results.js';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: '',
      status: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let product = '/search/' + this.state.product;
    this.setState({
      status: 'submitted',
      productUrl: product
    })
  }

  handleChange = (event) => {
    //Will update location upon change of the text fields
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }

  render(){
    var display;

    if (!this.state.productUrl) {
      display = (
        <form onSubmit={this.handleSubmit}>
          <h1>Search for a product</h1>
          <div className="searchBar">
            <FA name="search" /> <input name="product" placeholder="e.g. Clinique Mositurizer" onChange={this.handleChange} value={this.state.product} />
          </div>
        </form>
      )
    }
    else {
      display = <Redirect to={this.state.productUrl} />
    }

    return(
          <div className="search">
            {display}
            <Route path="/search/:product" render={
              (props) => (<Results {...props} />)
            } />
          </div>
      );
  }
}

export default Search;
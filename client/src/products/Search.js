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
    this.setState({
      status: 'submitted',
      productSummited: this.state.product
    })
  }

  handleChange = (event) => {
    //Will update location upon change of the text fields
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }

  render(){
    var results;

    if(this.state.status === 'submitted') {
      // Doing separately so it doesn't auto update if they revise submission
      results = <Results name={this.state.productSubmitted} />
    }

    return(
      <div className="search">
        <form onSubmit={this.handleSubmit}>
          <h1>Search for a product</h1>
          <div className="searchBar">
            <FA name="search" /> <input name="product" placeholder="e.g. Clinique Mositurizer" onChange={this.handleChange} value={this.state.product} />
          </div>
        </form>
        {results}
      </div>
    );
  }
}

export default Search;
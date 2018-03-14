import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      product: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(this.state.product);
  }

  handleChange = (event) => {
    //Will update location upon change of the text fields
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }

  render(){
    return(
          <div className="search">
            <h1>Search for a product</h1>
              <form onSubmit={this.handleSubmit}>
                  <div className="searchBar">
                    <FA name="search" /> <input name="product" placeholder="e.g. Clinique Mositurizer" onChange={this.handleChange} value={this.state.product} />
                  </div>
              </form>
          </div>
      );
  }
}

export default Search;
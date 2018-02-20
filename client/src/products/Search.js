import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
          <div>
          <h2>Search for a product</h2>
            <form onSubmit={this.handleSubmit}>
                <input name="product" placeholder="e.g. Clinique Mositurizer" onChange={this.handleChange} value={this.state.product} />
            <input type="submit" value="Search" />
            </form>
          </div>
      );
  }
}

export default Search;